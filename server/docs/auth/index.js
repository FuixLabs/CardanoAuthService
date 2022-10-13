const getRandomNumber = require('./getRandomNumber');
const login = require('./login');
const verify = require('./verify');

module.exports = {
    '/api/auth/getRandomNumber': {
        ...getRandomNumber,
    },
    '/api/auth/login': {
        ...login,
    },
    '/api/auth/verify': {
        ...verify,
    },
};
