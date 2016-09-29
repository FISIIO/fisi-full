const express = require('express');
const api     = express.Router();

require(__dirname + '/events')(api);

module.exports = api;
