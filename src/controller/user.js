const { success, error } = require("../utils/response");
const c = require("../constants");
const mongoose = require('mongoose');
const { INVALID_ARGUMENT } = require("../utils/strings");
const strings = require("../utils/strings");
const { addUserMinInfoValidator } = require("../validator/addUserMinInfoValidator");
const status = require("../constants/status");
const { updateUserProfileValidator } = require("../validator/updateSocialLinksValidator");
const { merge } = require("lodash");
const { removeFile } = require("../utils/fileUtils");
const { getProfilePictureURL: getImageUrl, getImagePathFromURL } = require("../utils");
const { validateUpdateProfilePictureUrl } = require("../validator/updateProfilePictureUrlValidator");
const User = mongoose.model(c.user);
const SocialMedia = mongoose.model(c.socialMedia);

const avatarImages = (req) => {
    return [
        { url: getImageUrl(req, "uploads/avatar1.png") },
        { url: getImageUrl(req, "uploads/avatar2.png") },
        { url: getImageUrl(req, "uploads/avatar3.png") },
        { url: getImageUrl(req, "uploads/avatar4.png") },
    ];
}

module.exports.addUserMinInfo = async function addUserMinInfo(req, res) {
    try {
        const response = addUserMinInfoValidator(req.body);
        if (response.error) {
            console.log(response.error);
            return error({ res, msg: INVALID_ARGUMENT });
        }
        const { firstname, lastname, username } = response.value;
        User.findOneAndUpdate({ _id: req.user._id }, { firstname, lastname, username })
            .then(result => {
                success({ res, msg: strings.SUCCESS_UPDATE_USER });
            }).catch(e => {
                console.log(e);
                error({ res, msg: strings.ERROR_UPDATING_USER });
            })
    } catch (e) {
        console.log(e);
        error({ res });
    }
}

module.exports.getCurrentUserDetails = async function getCurrentUserDetails(req, res) {
    try {
        const { firstname, lastname, username, bio, profilePic, profileCover } = req.user;
        if (username == null || username == undefined || firstname == null || firstname == undefined) {
            error({ res, status: status.PERSONAL_DETAIL_NOT_FILLED, msg: strings.PERSONAL_DETAILS_NOT_FILLED })
        } else {
            const select = '-_id phone personalMail collegeMail workMail whatsapp telegram instagram facebook twitter linkedin linktree website';
            const userWithSocialMedia = await User.findById(req.user._id).populate("socialMedia", select).exec();
            if (userWithSocialMedia.socialMedia != null) {
                const socialLinks = userWithSocialMedia.socialMedia;
                success({
                    res, data: {
                        firstname: firstname,
                        lastname: lastname || "",
                        username: username,
                        bio: bio || "",
                        socialLinks: socialLinks,
                        profilePic: profilePic ? getImageUrl(req, profilePic) : "",
                        profileCover: profileCover ? getImageUrl(req, profileCover) : ""
                    }
                })
            } else {
                error({ res });
            }
        }
    } catch (e) {
        console.log(e);
        error({ res });
    }
}

exports.deleteCurrentUser = async (req, res) => {
    try {
        const user = await User.findOneAndRemove({ _id: req.user._id });
        if (!user) {
            return error({ res, status: 404, msg: strings.userNotFound });
        }
        // Delete the related socialMedia document as well
        if (user.socialMedia) {
            await SocialMedia.findOneAndRemove({ _id: user.socialMedia });
        }
        success({ res, msg: strings.userDeleted })
    } catch (err) {
        console.error(err);
        success({ res, msg: strings.errorDeletingUser })
    }
};

module.exports.updateCurrentUserProfile = async (req, res) => {
    try {
        const response = updateUserProfileValidator(req.body);
        if (response.error) {
            console.log(response.error);
            return error({ res, msg: INVALID_ARGUMENT });
        } else {
            const { phone, personalMail, collegeMail, workMail, whatsapp, telegram, instagram, facebook, twitter, linkedin, linktree, website, firstname, lastname, bio } = response.value;
            const newSocialFields = { phone, personalMail, collegeMail, workMail, whatsapp, telegram, instagram, facebook, twitter, linkedin, linktree, website };
            const newUserFields = { firstname, lastname, bio };
            const updatedSocialMedia = await SocialMedia.findByIdAndUpdate(req.user.socialMedia, newSocialFields, { new: true, projection: { _id: 0, __v: 0 } });
            const updatedUser = await User.findByIdAndUpdate(req.user._id, newUserFields, { new: true, projection: { _id: 0, __v: 0, phone: 0, isVerified: 0, otp: 0, socialMedia: 0, createdAt: 0, updatedAt: 0, username: 0, profilePic: 0 } });
            if (updatedSocialMedia != null && updatedUser != null) {
                success({
                    res,
                    data: merge(updatedUser, updatedSocialMedia)
                })
            } else {
                error({ res, msg: strings.errorUpadatingUserProfile });
            }
        }
    } catch (e) {
        console.log(e);
        error({ res });
    }
}

module.exports.updateProfilePicture = async (req, res) => {
    try {
        // Check if file is present in the request
        if (!req.file) {
            return error({ res, msg: strings.pleaseUploadImage });
        }

        const user = await User.findById(req.user._id);

        if (!user) {
            return error({ res, msg: strings.userNotFound, status: 404 });
        }

        // Delete Existing profile picture
        removeFile(user.profilePic);

        // Save the file path to the user document
        user.profilePic = req.file.path;

        // Save the updated user document
        await user.save();
        const newProfilePicUrl = getImageUrl(req, user.profilePic);
        success({
            res, msg: strings.successUploadProfilPicture, data: {
                profilePic: newProfilePicUrl
            }
        });
    } catch (err) {
        console.error(err);
        error({ res, msg: strings.SERVER_ERR });
    }
};

module.exports.updateProfileCover = async (req, res) => {
    try {
        // Check if file is present in the request
        if (!req.file) {
            return error({ res, msg: strings.pleaseUploadImage });
        }

        const user = await User.findById(req.user._id);

        if (!user) {
            return error({ res, msg: strings.userNotFound, status: 404 });
        }

        // Delete Existing profile picture
        removeFile(user.profileCover);

        // Save the file path to the user document
        const image = req.file.path;
        user.profileCover = image;

        // Save the updated user document
        await user.save();
        success({
            res, msg: strings.successUploadProfileCover, data: {
                profileCover: getImageUrl(req, image)
            }
        });
    } catch (err) {
        console.error(err);
        error({ res, msg: strings.SERVER_ERR });
    }
};

module.exports.getProfileAvatars = async (req, res) => {
    try {
        success({
            res, data: avatarImages(req)
        });
    } catch (err) {
        console.error(err);
        error({ res, msg: strings.SERVER_ERR });
    }
};

module.exports.setProfileImageAvatar = async (req, res) => {
    try {

        const response = validateUpdateProfilePictureUrl(req.body);
        if (response.error) {
            console.log(response.error);
            return error({ res, msg: INVALID_ARGUMENT });
        } else {

            const { filename } = response.value;
            const user = await User.findById(req.user._id);
            if (!user) {
                return error({ res, msg: strings.userNotFound, status: 404 });
            }

            // Delete Existing profile picture
            removeFile(user.profileCover);

            // Save the file path to the user document
            const image = filename;
            user.profilePic = getImagePathFromURL(image);

            // Save the updated user document
            await user.save();
            success({
                res, msg: strings.successUploadProfilPicture, data: {
                    profilePic: image
                }
            });
        }
    } catch (err) {
        console.error(err);
        error({ res, msg: strings.SERVER_ERR });
    }
};