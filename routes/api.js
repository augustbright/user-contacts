const express = require('express');
const contacts = require('./contacts');
const api = express.Router();

api.use('/contacts', contacts);

module.exports = api;
