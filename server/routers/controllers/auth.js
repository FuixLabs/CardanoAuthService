/**
 *
 * Copyright (c) 2022 - FuixLabs
 *
 * @author Nguyen Minh Tam / ngmitam@ferdon.io
 */

/* eslint-disable no-underscore-dangle */
/* eslint-disable consistent-return */

const serverConfig = require('../../config/serverConfig');
const authMiddleware = require('../middlewares/auth');
const cardanoUtils = require('../middlewares/cardanoUtils');

module.exports = {
    async getRandomNumber(req, res, next) {
        authMiddleware
            .generateJWToken({ randomNumber: Math.random(), timestamp: Date.now() }, req)
            .then(({ accessToken }) => {
                res.cookie(serverConfig.authentication.jwt.cookieId, accessToken);
                res.json({
                    data: {
                        access_token: accessToken,
                    },
                });
            })
            .catch((err) => {
                next(err);
            });
    },
    async login(req, res, next) {
        if (!req.cookies[serverConfig.authentication.jwt.cookieId]) return res.sendStatus(401);
        const accessToken = req.cookies[serverConfig.authentication.jwt.cookieId];
        const { content } = await authMiddleware.verifyJWToken(accessToken);
        const data = req.body;
        if (!data) return res.sendStatus(401);
        if (!content) return res.sendStatus(401);
        if (content?.data?.timestamp + serverConfig.authentication.jwt.short.renewBeforeExpires * 1000 < Date.now())
            return next(new Error(10001));
        if (cardanoUtils.verifySignedMessage(data.address, JSON.stringify(content?.data), data.signedData)) {
            authMiddleware
                .generateJWToken({ address: cardanoUtils.getAddressFromHexEncoded(data.address) }, req, data.rememberMe)
                .then(({ accessToken }) => {
                    res.cookie(serverConfig.authentication.jwt.cookieId, accessToken);
                    res.json({
                        data: {
                            access_token: accessToken,
                        },
                    });
                })
                .catch((err) => {
                    next(err);
                });
        } else {
            next(new Error(10000));
        }
    },
    async verify(req, res, next) {
        if (!req.cookies[serverConfig.authentication.jwt.cookieId]) return res.sendStatus(401);
        const accessToken = req.cookies[serverConfig.authentication.jwt.cookieId];
        let content;
        try {
            const result = await authMiddleware.verifyJWToken(accessToken);
            content = result?.content;
            const renew = result?.renew;
            if (content.rememberMe && renew) {
                const renewToken = await authMiddleware.regenerateJWToken(content);
                res.cookie(serverConfig.authentication.jwt.cookieId, renewToken);
            }
        } catch (err) {
            return res.sendStatus(401);
        }
        if (!content || !content.data || !content.data.address) return res.sendStatus(401);
        return res.json({
            data: {
                address: content.data.address,
            },
        });
    },
    async logout(_, res) {
        res.clearCookie(serverConfig.authentication.jwt.cookieId);
        res.json({});
    },
};
