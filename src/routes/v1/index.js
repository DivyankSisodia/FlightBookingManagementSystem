const express = require('express');

const router = express.Router();

const {AuthRequestValidator} = require('../../middleware/index');

const UserController = require('../../controllers/user-controller');

router.post('/signup', AuthRequestValidator.validateUserAuth ,UserController.create);
router.post('/signin', AuthRequestValidator.validateUserAuth,UserController.signIn);

router.get('/isAuthenticated', UserController.isAuthenticated);
router.get('/isAdmin', AuthRequestValidator.validateIsAdminRequest, UserController.isAdmin);
module.exports = router;