const router = require('express').Router();

const userRouter = require('./user.js');
const tokenRouter = require('./token.js');

router.use('/token', tokenRouter);
router.use('/user', userRouter);

module.exports = router;