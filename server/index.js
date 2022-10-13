/**
 *
 * Copyright (c) 2022 - FuixLabs
 *
 * @author Nguyen Minh Tam / ngmitam@ferdon.io
 */

'use-strict';

const server = require('./server');

server.start({ port: process.env.PORT || 12000 });
