var express = require('express');
var router = express.Router();

// Controller
var user_controller = require('../controllers/userController');


/* GET users listing. */
router.get('/', user_controller.users_get);

/* POST user */
router.post('/', user_controller.user_post);

/* GET user */
router.get('/:id', user_controller.user_get);

/* POST to update a user */
router.post('/:id', user_controller.user_update);

/* DELETE  a user */
router.delete('/:id', user_controller.user_delete);


module.exports = router;