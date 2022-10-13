/**
 *
 * Copyright (c) 2022 - FuixLabs
 *
 * @author Nguyen Minh Tam / ngmitam@ferdon.io
 */

const express = require('express');

const router = express.Router();

const authController = require('../controllers/auth');

router.get('/getRandomNumber', authController.getRandomNumber);
router.post('/login', authController.login);
router.get('/verify', authController.verify);

module.exports = router;
