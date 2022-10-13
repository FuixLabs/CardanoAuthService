/**
 *
 * Copyright (c) 2022 - FuixLabs
 *
 * @author Nguyen Minh Tam / ngmitam@ferdon.io
 */

const http = require('http');
const express = require('express');
const cookieParser = require('cookie-parser');
const compression = require('compression');
const methodOverride = require('method-override');
const cors = require('cors');
const swaggerUI = require('swagger-ui-express');

const routers = require('./routers');

const app = express();
app.use(cors());
app.use(compression());
app.use(cookieParser());
app.use(express.json());
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, _next) => {
    res.json({
        error_message: 'Body should be a JSON',
    });
});
app.use(
    express.urlencoded({
        extended: true,
    })
);
// eslint-disable-next-line no-unused-vars
app.use(methodOverride());

const server = http.createServer(app);

const docs = require('./docs');
app.use('/docs', swaggerUI.serve, swaggerUI.setup(docs));

async function start(params) {
    routers(app);
    app.use((err, req, res, next) => {
        res.json({
            error_code: err.error_code || err.message,
            error_message: err.message,
            error_data: err.error_data,
        });
    });
    server.listen(params.port || 80, () => {
        console.log(`Listening on http://localhost${params.port ? `:${params.port}` : ''}`);
        if (params && params.done) params.done();
    });
}

module.exports = {
    start,
    stop: (done) => {
        server.close(done);
    },
};
