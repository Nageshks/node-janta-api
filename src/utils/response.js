const strings = require("./strings");

module.exports.success = function success(res, data = {}, status = 200, msg = strings.SUCCESS) {
    res.status(status).send(successRes(status, msg, data));
}

module.exports.error = function error(res, data = {}, status = 400, msg = strings.ERROR) {
    res.status(status).send(errorRes(status, msg, data));
}

function successRes(status = 200, msg = "success", data = {}) {
    return buildResponse(status, msg, data);
}

function errorRes(status = 400, msg = "error", data = {}) {
    return buildResponse(status, msg, data);
}

function buildResponse(status, msg, data) {
    return {
        status: status,
        msg: msg,
        data: data
    }
}