module.exports.generatePin = function generatePin() {
    return Math.floor(1000 + Math.random() * 9000)
}

module.exports.getProfilePictureURL = (req,filepath) => {
    return `${req.protocol}://${req.get('host')}/${filepath}`;
}
