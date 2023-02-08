const axios = require("axios");
const { TEXT_LOCAL_API_KEY, TEXT_LOCAL_API_SENDER, TEXT_LOCAL_API_URL } = require("../config");

const tlClient = axios.create({
    baseURL: TEXT_LOCAL_API_URL,
});

const smsClient = {
    sendOtpVerificationMessage: async (user) => {
        if (user && user.phone && user.code) {
            const params = new URLSearchParams();
            params.append("apiKey", TEXT_LOCAL_API_KEY);
            params.append("sender", TEXT_LOCAL_API_SENDER); // Please change you value here
            params.append("numbers", [parseInt("91" + user.phone)]);
            params.append(
                "message",
                `Hi there, thank you for sending your first test message from Textlocal. Get 20% off today with our code: ${user.code}.`
            );
            const url = "send/?"+ params.toString();
            console.log(url);
            const promiseSendSMS = new Promise((resolve, reject) => {
                tlClient.get(url).then(res => {
                    console.log(res.data);
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