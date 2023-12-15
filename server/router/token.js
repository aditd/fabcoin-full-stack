const tokenRouter = require('express').Router();
const controller = require('../models/token.js');

tokenRouter.post('/mint-token/', controller.grantTokensToEntity);
tokenRouter.post('/spend-token/', controller.grantTokensToConsumer);
tokenRouter.get('/get-all-tokens/', controller.getAllUTXOs);
tokenRouter.post('/get-client-tokens/:userid', controller.getClientUTXOs);

module.exports = tokenRouter;