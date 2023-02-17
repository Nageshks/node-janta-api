const { success, error } = require("../utils/response");
const c = require("../constants");
const mongoose = require('mongoose');
const { INVALID_ARGUMENT } = require("../utils/strings");
const strings = require("../utils/strings");
const { addUserMinInfoValidator } = require("../validator/addUserMinInfoValidator");
const status = require("../constants/status");
const { string } = require("joi");
const User = mongoose.model(c.user);
const SocialMedia = mongoose.model(c.socialMedia);


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
        const { firstname, lastname, username, bio, profilePic, profileConver } = req.user;
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
                        profilePic: profilePic || "",
                        profileConver: profileConver || ""
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
