const { success, error } = require("../utils/response");

module.exports.authenticateWithPhone = function authenticateWithPhone(req, res) {
    const { phone } = req.body;
    if (!phone) {
        error(res);
    }
    success(res, phone);
}