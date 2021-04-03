const User = require("../models/user");
const { body, validationResult } = require("express-validator");
const async = require("async");

// GET request for all users
exports.users_get = function (req, res, next) {
    res.send('get all users');
};

// GET request for one users
exports.user_get = function (req, res, next) {
    res.send('get user ' + req.params.id);
};

// post request to create a user
exports.user_post = function (req, res, next) {
    res.send('post request for a user');
};

// post request to update a user
exports.user_update = function (req, res, next) {
    res.send('post request to update a user');
};

// delete a user
exports.user_delete = function (req, res, next) {
    res.send('delete request to delete a user');
};