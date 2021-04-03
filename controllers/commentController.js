const Post = require("../models/post");
const Comment = require("../models/comment");
const { body, validationResult } = require("express-validator");
const async = require("async");

// GET request for all comments
exports.comments_get = function (req, res, next) {
    res.send('get all comments');
};

// GET request for one comment
exports.comment_get = function (req, res, next) {
    res.send('get comment ' + req.params.commentid);
};

// post request to create a comment
exports.comment_post = function (req, res, next) {
    res.send('post request for a comment');
};

// post request to update a comment
exports.comment_update = function (req, res, next) {
    res.send('post request to update a comment');
};

// delete a comment
exports.comment_delete = function (req, res, next) {
    res.send('delete request to delete a comment');
};