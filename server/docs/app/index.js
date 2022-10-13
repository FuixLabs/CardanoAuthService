const getDappInfo = require('./getDappInfo');

module.exports = {
    '/api/auth/getRandomNumber': {
        ...getDappInfo,
    },
};
