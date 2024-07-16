const crypto = require('crypto');

const generateJwtSecret = () => {
    return crypto.randomBytes(32).toString('hex');
};

console.log(generateJwtSecret());
