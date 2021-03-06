var express = require('express');
var router = express.Router();

// Controller
var post_controller = require('../controllers/postController');
var comment_controller = require('../controllers/commentController');

/* Posts */

/* GET posts */
router.get('/', post_controller.posts_get);

/* POST post */
router.post('/', post_controller.post_post);

/* GET post */
router.get('/:id', post_controller.post_get);

/* POST to update a post */
router.post('/:id', post_controller.post_update);

/* DELETE  a post */
router.delete('/:id', post_controller.post_delete);

/* Comments */

/* GET comments */
router.get('/:postId/comments', comment_controller.comments_get);

/* POST comment */
router.post('/:postId/comments', comment_controller.comment_post);

/* GET comment */
router.get('/:postId/comments/:commentId', comment_controller.comment_get);

/* POST to update a comment */
router.post('/:postId/comments/:commentId', comment_controller.comment_update);

/* DELETE  a comment */
router.delete('/:postId/comments/:commentId', comment_controller.comment_delete);

module.exports = router;