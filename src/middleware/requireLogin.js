const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const { JWT_SECRET } = require('../config');
const c = require('../constants/index');
const status = require('../constants/status');
const { error } = require('../utils/response');
const strings = require('../utils/strings');

module.exports = (req, res, next) => {
    const { authorization } = req.headers;
    //authorization === Bearer <token>
    if (!authorization) {
        return error({ res, msg: strings.LOGIN_REQUIRED, status: status.LOGIN_REQUIRED });
    }
    const token = authorization.replace("Bearer ", "");
    const User = mongoose.model(c.user);
    jwt.verify(token, JWT_SECRET, (err, payload) => {
        if (err) {
            return error({ res, msg: strings.INVALID_CREDENTIALS, status: status.LOGIN_REQUIRED });
        }
        const { _id } = payload;
        User.findById(_id).then(userdata => {
            req.user = userdata;
            console.log(req.user);
            if(req.user == null){
                return error({ res, status: 404, msg: strings.userNotFound });
            }
            else if(!req.user.isVerified){
                error({ res, msg: strings.USER_NOT_VERIFIED, status: status.USER_NOT_VERIFIED });
            }
            else if(req.user.isVerified){
                next(err);
            }else {
                error({ res, msg: strings.SERVER_ERR });
            }
        })
    })
}