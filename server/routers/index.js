/**
 *
 * Copyright (c) 2022 - FuixLabs
 *
 * @author Nguyen Minh Tam / ngmitam@ferdon.io
 */

const constants = require('./constants');

const authRoutes = require('./routes/auth');
const appRoutes = require('./routes/app');

module.exports = (app) => {
    app.use(`${constants.baseApi}/auth`, authRoutes);
    app.use(`${constants.baseApi}/app`, appRoutes);

    require('./public')(app);
};
