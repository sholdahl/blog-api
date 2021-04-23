const Post = require("../models/post");
const User = require("../models/user");
const { body, validationResult } = require("express-validator");
const async = require("async");

// GET request for all posts
exports.posts_get = function (req, res, next) {
  Post.find()
    .populate("author")
    .sort([["date", "descending"]])
    .exec((err, posts) => {
      if (err) {
        return next(err);
      }
      res.json(posts);
    });
};

// GET request for one post
exports.post_get = function (req, res, next) {
  Post.findById(req.params.id)
    .populate("author")
    .exec((err, post) => {
      if (post == undefined) {
        res.status(404);
        res.json({
          message: "Post not found",
        });
      }
      if (err) {
        return next(err);
      }
      res.json(post);
    });
};

// post request to create a post
exports.post_post = [
  // Validate and sanitize fields.
  body("title")
    .trim()
    .isLength({ min: 1, max: 100 })
    .escape()
    .withMessage("Must provide a title."),
  body("content")
    .trim()
    .isLength({ min: 1, max: 30000 })
    .escape()
    .withMessage("Must provide content."),
  body("published")
    .isBoolean()
    .trim()
    .isLength({ min: 1, max: 100 })
    .escape()
    .withMessage("Must indicate published status"),
  body("url")
    .optional({ checkFalsy: true })
    .trim()
    .isLength({ min: 1, max: 100 })
    .escape()
    .withMessage("seo url must be less than 100 characters"),
  body("author")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("must provide an author id"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // There are errors.
      res.json(errors.array());
      return;
    } else {
      // check to see if a url was specified. If not, make the url the title
      if (!req.body.url) {
        let defaultUrl = req.body.title.replace(/\s+/g, "-").toLowerCase();
        req.body.url = defaultUrl;
      }

      // check to see if the url is in use
      Post.findOne({ url: req.body.email }).exec((err, foundPost) => {
        if (foundPost) {
          res.json({
            value: req.body.url,
            message: "url already in use",
            param: "url",
            location: "body",
          });
        } else {
          // url is not in use, check if author ID is valid
          console.log("url is not being used");

          User.findById(String(req.body.author)).exec((err, author) => {
            if (err) {
              return next(err);
            }
            if (author == undefined) {
              res.status(404);
              res.json({
                message: "Author not found",
              });
            } else {
              console.log("author found");

              // author found, so create post
              let date = new Date().toISOString();

              let post = new Post({
                title: req.body.title,
                content: req.body.content,
                date: date,
                published: req.body.published,
                url: req.body.url,
                author: req.body.author,
              });
              post.save((err) => {
                if (err) {
                  return next(err);
                }
                res.json({ message: "post created" });
              });
            }
          });
        }
      });
    }
  },
];

// post request to update a post
exports.post_update = [
  // Validate and sanitize fields.
  body("title")
    .trim()
    .isLength({ min: 1, max: 100 })
    .escape()
    .withMessage("Must provide a title."),
  body("content")
    .trim()
    .isLength({ min: 1, max: 30000 })
    .escape()
    .withMessage("Must provide content."),
  body("published")
    .isBoolean()
    .trim()
    .isLength({ min: 1, max: 100 })
    .escape()
    .withMessage("Must indicate published status"),
  body("url")
    .optional({ checkFalsy: true })
    .trim()
    .isLength({ min: 1, max: 100 })
    .escape()
    .withMessage("seo url must be less than 100 characters"),
  body("author")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("must provide an author id"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // There are errors.
      res.json(errors.array());
      return;
    } else {
      // check to see if a url was specified. If it was, check if it is in use
      if (req.body.url) {
        Post.findOne({ url: req.body.email }).exec((err, foundPost) => {
          if (err) {
            return next(err);
          }
          if (foundPost) {
            if (String(foundPost._id) !== String(req.params.id)) {
              res.json({
                value: req.body.url,
                message: "url already in use",
                param: "url",
                location: "body",
              });
            }
          }
        });
      }
      // url is not in use, or is in use by this post, so update post
      console.log("url is not being used");

      User.findById(String(req.body.author)).exec((err, author) => {
        if (err) {
          return next(err);
        }
        if (author == undefined) {
          res.status(404);
          res.json({
            message: "Author not found",
          });
        } else {
          console.log("author found");

          let updatedPost = {
            title: req.body.title,
            content: req.body.content,
            published: req.body.published,
            author: req.body.author,
          };

          //   if there was a new url provided, update that too
          if (req.body.url) {
            updatedPost.url = req.body.url;
          }

          Post.findByIdAndUpdate(req.params.id, updatedPost, (err) => {
            if (err) {
              return next(err);
            }
            res.json({ message: "post updated" });
          });
        }
      });
    }
  },
];

// delete a post
exports.post_delete = function (req, res, next) {
  Post.findById(req.params.id).exec((err, foundPost) => {
    if (foundPost == undefined) {
      res.status(404);
      res.json({
        message: "Post not found",
      });
    }
    if (err) {
      return next(err);
    } else {
      Post.findByIdAndDelete(req.params.id, (err) => {
        if (err) {
          return next(err);
        }
        res.json({ message: "post deleted" });
      });
    }
  });
};