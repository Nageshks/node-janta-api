const { success, error } = require("../utils/response");
const c = require("../constants");
const mongoose = require('mongoose');
const { INVALID_ARGUMENT } = require("../utils/strings");
const strings = require("../utils/strings");

module.exports.addUserMinInfo = async function addUserMinInfo(req, res) {
    try {
        const response = addUserMinInfo(req.body);
        if (response.error) {
            console.log(response.error);
            return error({ res, msg: INVALID_ARGUMENT });
        }
        const { firstname, lastname, username } = response.value;
        const User = mongoose.model(c.user);
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
