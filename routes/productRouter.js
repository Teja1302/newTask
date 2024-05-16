const express = require('express');
const ProductCreate = require('../contoller/productController');

const productrouter = express.Router();

productrouter.post('/products', ProductCreate);

module.exports=productrouter;