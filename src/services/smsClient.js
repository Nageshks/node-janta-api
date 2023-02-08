const axios = require("axios");
const { TEXT_LOCAL_API_KEY, TEXT_LOCAL_API_SENDER, TEXT_LOCAL_API_URL } = require("../config");

const tlClient = axios.create({
    baseURL: TEXT_LOCAL_API_URL,
    params: {
        apiKey: TEXT_LOCAL_API_KEY,
        sender: TEXT_LOCAL_API_SENDER
    }
});

const smsClient = {
    sendOtpVerificationMessage: async (user) => {
        if (user && user.phone && user.code) {
            const params = new URLSearchParams();
            params.append("numbers", [parseInt("91" + user.phone)]);
            params.append(
                "message",
                `Hi there, thank you for sending your first test message from Textlocal. Get 20% off today with our code: ${user.code}.`
            );
            console.log(params);
            const promiseSendSMS = new Promise((resolve, reject) => {
                tlClient.post("send", params).then(res => {
                    console.log(res);
                    resolve(res.data && res.data.status && res.data.status == "success");
                }).catch(e => {
                    reject(e);
                    console.log(e);
                });
            });
            const isSent = await promiseSendSMS;
            return isSent;
        }
        return false;
    }
};

module.exports = smsClient;