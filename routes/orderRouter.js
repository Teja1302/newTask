
const express = require('express');
const orderRouter = express.Router();
const {createOrder}=require('../contoller/orderController')

orderRouter.post('/api/orders',createOrder );

module.exports = orderRouter;
