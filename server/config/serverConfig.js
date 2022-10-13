/**
 *
 * Copyright (c) 2022 - FuixLabs
 *
 * @author Nguyen Minh Tam / ngmitam@ferdon.io
 */

const fs = require('fs');
const path = require('path');
require('dotenv').config();

const privateKey = fs.readFileSync(path.join(__dirname, '../routers/middlewares/auth/PRIVATE_KEY'), 'utf8');
const publicKey = fs.readFileSync(path.join(__dirname, '../routers/middlewares/auth/PUBLIC_KEY'), 'utf8');
module.exports = {
    env: process.env,
    authentication: {
        salts: process.env.salt || 10,
        jwt: {
            long: {
                expiresIn: 60 * 60 * 24 * 30, // 30 days
                renewBeforeExpires: 60 * 60 * 24 * 5, // 5 days
            },
            short: {
                expiresIn: 60 * 60, // 4 hours
                renewBeforeExpires: 60 * 15, // 15 minutes
            },
            cookieId: 'access_token',
            algorithm: 'RS256',
            privateKey,
            publicKey,
        },
    },
};
