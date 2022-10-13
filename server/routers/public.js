const express = require('express');
const path = require('path');

module.exports = (app) => {
    app.use('/', express.static(path.join(__dirname, '../../client/build')));
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../../client/build/index.html'));
    });
};
