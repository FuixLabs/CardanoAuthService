/**
 *
 * Copyright (c) 2022 - FuixLabs
 *
 * @author Nguyen Minh Tam / ngmitam@ferdon.io
 */

/* eslint-disable no-underscore-dangle */
/* eslint-disable consistent-return */

/**
 * @description List of all allowed apps.
 */

const APPS = require('./apps.json');

// @modified by tkhang@ferdon.io
// require("dotenv").config();
// const APPS = [
//     {
//         "appKey": process.env.APPKEY,
//         "name": process.env.NAME,
//         "url": process.env.URL,
//         "return_url": process.env.RETURN_URL,
//         "logo": process.env.LOGO,
//     }
// ];

module.exports = {
    async getAppInfo(req, res, next) {
        const query = req.query;
        if (!query) return res.sendStatus(401);
        const appKey = query['app-key'];
        if (!appKey) return res.sendStatus(401);
        const appData = APPS.find((app) => app.appKey === appKey);
        if (appData) {
            return res.json({
                data: appData,
            });
        }

        return res.sendStatus(401);
    },
};
