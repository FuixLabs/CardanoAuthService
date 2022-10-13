/**
 *
 * Copyright (c) 2022 - FuixLabs
 *
 * @author Nguyen Minh Tam / ngmitam@ferdon.io
 */

/* eslint-disable no-underscore-dangle */
const jwt = require('jsonwebtoken');

const config = require('../../../config/serverConfig');

const TokenGenerator = require('./localTokenGenerator');

const tokenGenerator = new TokenGenerator(config, jwt);

async function generateJWToken(data, req, rememberMe) {
    const accessToken = await tokenGenerator.getToken({ data, rememberMe });
    return {
        data,
        accessToken,
    };
}

async function regenerateJWToken(data) {
    const accessToken = await tokenGenerator.getToken(data);
    return accessToken;
}
async function verifyJWToken(token) {
    const content = await jwt.verify(token, config.authentication.jwt.publicKey, {
        algorithms: [config.authentication.jwt.algorithm],
    });
    const result = {
        content,
        renew: false,
    };
    // Check if token is about to expire...
    let { renewBeforeExpires } = config.authentication.jwt.short;
    if (content.rememberMe) {
        renewBeforeExpires = config.authentication.jwt.long.renewBeforeExpires;
    }

    if (renewBeforeExpires > 0 && content.exp - Date.now() / 1000 < renewBeforeExpires) {
        result.renew = true;
    }
    return result;
}

module.exports = {
    verifyJWToken,
    generateJWToken,
    regenerateJWToken,
};
