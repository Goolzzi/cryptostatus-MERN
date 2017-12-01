const crypto = require('crypto'),
    algorithm = 'aes-256-ctr',
    password = 'cryptostats';

let crypts = {
    encrypt: (text) => {
        const cipher = crypto.createCipher(algorithm, password)
        let crypted = cipher.update(text, 'utf8', 'hex')
        crypted += cipher.final('hex');
        return crypted;
    },
    decrypt: (text) => {
        const decipher = crypto.createDecipher(algorithm, password)
        let decrypted = decipher.update(text, 'hex', 'utf8')
        decrypted += decipher.final('utf8');
        return decrypted;
    }
};

module.exports = crypts;
