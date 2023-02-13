const { success, error } = require("../utils/response");
const smsClient = require("../services/smsClient");
const { validateLoginWithPhone } = require("../validator/loginValidator");
const { generatePin } = require("../utils");
const c = require("../constants");
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const { INVALID_ARGUMENT, PROBLEM_SENDING_OTP, NO_USER_FOUND, LOGIN_SUCCESS, INCORRECT_OTP } = require("../utils/strings");
const { validateOtpValidator } = require("../validator/validateOtpValidator");
const { JWT_SECRET } = require("../config");

module.exports.authenticateWithPhone = async function authenticateWithPhone(req, res) {
    try {
        const response = validateLoginWithPhone(req.body);
        if (response.error) {
            return error({ res, msg: INVALID_ARGUMENT });
        }
        const { phone } = response.value;
        const User = mongoose.model(c.user);
        const query = { phone: phone };
        User.findOne(query, async function (err, user) {
            if (err) {
                return err(res);
            }
            const msg = {
                phone: phone,
                code: generatePin()
            }
            if (user) {
                user.otp = msg.code;
                const otpSent = await smsClient.sendOtpVerificationMessage(msg);
                console.log(otpSent);
                if (otpSent) {
                    user.save().then(result => {
                        success({ res });
                    })
                } else {
                    error({ res, msg: PROBLEM_SENDING_OTP });
                }
            } else {
                // handle new user
                console.log("new user");
                const newUser = new User({
                    phone: msg.phone,
                    otp: msg.code
                })
                const otpSent = await smsClient.sendOtpVerificationMessage(msg);
                console.log(otpSent);
                if (otpSent) {
                    newUser.save().then(createdUser => {
                        success({ res, status: 201 });
                    })
                } else {
                    error({ res, msg: PROBLEM_SENDING_OTP });
                }
            }
        });
    } catch (e) {
        console.log(e);
        error({ res });
    }
}

module.exports.validatePhoneAuth = async function validatePhoneAuth(req, res) {
    try {
        const response = validateOtpValidator(req.body);
        if (response.error) {
            console.log(response.error);
            return error({ res, msg: INVALID_ARGUMENT });
        }
        const { phone, otp } = response.value;
        const User = mongoose.model(c.user);
        const query = { phone: phone };
        User.findOne(query, function (err, user) {
            if (err) {
                return err({ res, msg: NO_USER_FOUND });
            }
            if (user) {
                const otpMatch = user.otp === parseInt(otp);
                if (otpMatch) {
                    user.otp = "";
                    user.isVerified = true;
                    user.save().then(result => {
                        const tkn = jwt.sign({ _id: user._id }, JWT_SECRET);
                        return success({ res, status: user.firstname ? 200 : 201, msg: LOGIN_SUCCESS, data: { token: tkn } });
                    })
                } else {
                    return error({ res, msg: INCORRECT_OTP });
                }
            } else {
                return err({ res, msg: NO_USER_FOUND });
            }
        });
    } catch (e) {
        console.log(e);
        error({ res });
    }
}
