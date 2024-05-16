const express = require('express');
const {signUp ,signIn}= require('../contoller/customerController');

const router = express.Router();


router.post('/customers/create', signUp);
router.post('/login', signIn);

module.exports = router;