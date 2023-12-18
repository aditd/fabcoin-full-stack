const tokenRouter = require('express').Router();
// const controller = require('../models/token.js');
const controller = require('../controller/token.js');

tokenRouter.post('/mint-token/', controller.mintTokens);
tokenRouter.post('/spend-token/', controller.spendTokens);
tokenRouter.get('/get-all-tokens/', controller.getAllUTXOs);
tokenRouter.post('/get-client-tokens/:userid', controller.getClientUTXOs);

module.exports = tokenRouter;