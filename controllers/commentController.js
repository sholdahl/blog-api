const Post = require("../models/post");
const Comment = require("../models/comment");
const { body, validationResult } = require("express-validator");
const async = require("async");

// GET request for all comments
exports.comments_get = function (req, res, next) {
  Comment.find({ post: String(req.params.postId) })
    .sort([["date", "descending"]])
    .exec((err, comments) => {
      if (err) {
        return next(err);
      }
      res.json(comments);
    });
};

// GET request for one comment
exports.comment_get = function (req, res, next) {
  Comment.findById(req.params.commentId).exec((err, comment) => {
    if (comment == undefined) {
      res.status(404);
      res.json({
        message: "Comment not found",
      });
    }
    if (err) {
      return next(err);
    }
    res.json(comment);
  });
};

// post request to create a comment
exports.comment_post = [
  // Validate and sanitize fields.
  body("comment")
    .trim()
    .isLength({ min: 1, max: 30000 })
    .escape()
    .withMessage("Must provide a comment."),
  body("author")
    .trim()
    .isLength({ min: 1, max: 100 })
    .escape()
    .withMessage("Must provide a title."),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // There are errors.
      res.json(errors.array());
      return;
    } else {
      // check if post ID is valid
      Post.findById(String(req.params.postId)).exec((err, post) => {
        if (err) {
          return next(err);
        }
        if (post == undefined) {
          res.status(404);
          res.json({
            message: "Post not found",
          });
        } else {
          // post found, so create comment
          let date = new Date().toISOString();

          let comment = new Comment({
            comment: req.body.comment,
            author: req.body.author,
            date: date,
            post: String(req.params.postId),
          });
          comment.save((err) => {
            if (err) {
              return next(err);
            }
            res.json({ message: "comment created" });
          });
        }
      });
    }
  },
];

// post request to update a comment
exports.comment_update = [
  // Validate and sanitize fields.
  body("comment")
    .trim()
    .isLength({ min: 1, max: 30000 })
    .escape()
    .withMessage("Must provide a comment."),
  body("author")
    .trim()
    .isLength({ min: 1, max: 100 })
    .escape()
    .withMessage("Must provide a title."),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // There are errors.
      res.json(errors.array());
      return;
    } else {
      Comment.findById(String(req.params.commentId)).exec((err, comment) => {
        if (err) {
          return next(err);
        }
        if (comment == undefined) {
          res.status(404);
          res.json({
            message: "Comment not found",
          });
        } else {
          Post.findById(String(req.params.postId)).exec((err, post) => {
            if (err) {
              return next(err);
            }
            if (post == undefined) {
              res.status(404);
              res.json({
                message: "Post for this comment not found",
              });
            } else {
              let updatedComment = {
                comment: req.body.comment,
                author: req.body.author,
              };
              Comment.findByIdAndUpdate(
                req.params.commentId,
                updatedComment,
                (err) => {
                  if (err) {
                    return next(err);
                  }
                  res.json({ message: "comment updated" });
                }
              );
            }
          });
        }
      });
    }
  },
];

// delete a comment
exports.comment_delete = function (req, res, next) {
  Comment.findById(req.params.commentId).exec((err, foundComment) => {
    if (foundComment == undefined) {
      res.status(404);
      res.json({
        message: "Comment not found",
      });
    }
    if (err) {
      return next(err);
    } else {
      Comment.findByIdAndDelete(req.params.commentId, (err) => {
        if (err) {
          return next(err);
        }
        res.json({ message: "comment deleted" });
      });
    }
  });
};
