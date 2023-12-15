
const userRouter = require('express').Router();
const controller = require('../controllers/entity.js');

userRouter.post('/', controller.registerUser);
userRouter.get('/', controller.getUsers);
