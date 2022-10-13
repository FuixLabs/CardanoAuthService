/**
 *
 * Copyright (c) 2022 - FuixLabs
 *
 * @author Nguyen Minh Tam / ngmitam@ferdon.io
 */

const express = require('express');

const router = express.Router();

const appController = require('../controllers/app');

router.get('', appController.getAppInfo);

module.exports = router;
