const Post = require("../models/post");
const { body, validationResult } = require("express-validator");
const async = require("async");

// GET request for all posts
exports.posts_get = function (req, res, next) {
    res.send('get all posts');
};

// GET request for one post
exports.post_get = function (req, res, next) {
    res.send('get post ' + req.params.id);
};

// post request to create a post
exports.post_post = function (req, res, next) {
    res.send('post request for a post');
};

// post request to update a post
exports.post_update = function (req, res, next) {
    res.send('post request to update a post');
};

// delete a post
exports.post_delete = function (req, res, next) {
    res.send('delete request to delete a post');
};