const path = require('path');

module.exports.generatePin = function generatePin() {
    return Math.floor(1000 + Math.random() * 9000)
}

module.exports.getProfilePictureURL = (req, filepath) => {
    return `${req.protocol}://${req.get('host')}/${filepath}`;
}

module.exports.getImagePathFromURL = (url) => {
    // Extract the path from the URL
    const parsedUrl = new URL(url);
    const filePath = parsedUrl.pathname;

    // Extract the directory name and filename from the file path
    const dirName = path.dirname(filePath);
    const fileName = path.basename(filePath);
    return `${path.join(dirName, fileName)}`;
}