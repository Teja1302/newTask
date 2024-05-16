
const sequelize = require("../config/dbconfig")

const Customer = require('../model/customerModel')
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const jwt =require('jsonwebtoken')
const emailService = require('../utils/emailService')
const stripe = require('stripe')('sk_test_tR3PYbcVNZZ796tH88S4VQ2u');

const signUp = async function (req, res) {
    try {
        const params = req.body;
        createdAt = new Date()
        const customer = await stripe.customers.list({
            email: params.customerEmail,
        });

        console.log("customer", customer)

        if (customer?.data.length > 0) {
            return res.status(401).json({ message: "email already exist" });
        }
        let createCustomer = await stripe.customers.create({
            email: params.customerEmail,
            name: params.customerName
        });

        console.log(createCustomer)

        let password = crypto.randomBytes(4).toString()

        hashedPassword = await bcrypt.hash(password, 10)//encryption

        params.stripeCustomerId = createCustomer.id

        params.password = hashedPassword

        const newUser = await Customer.create(params);

        await emailService.sendPasswordEmail(params.customerEmail, password);

       return res.status(201).json(newUser);
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ message: 'Could not create user', error: error.message });
    }
}

const signIn = async function (req, res) {
    try {
        let {userEmail, password} = req.body;
        const signIn = await Customer.findOne({
            where: {
                customerEmail: userEmail
            }, raw: true

        })
        //console.log(signIn)
        if (signIn) {
            let comparePassword = await bcrypt.compareSync(password, signIn.password)
            if (comparePassword) {

                let encrptData = {
                    id: signIn.customerId,
                    name: signIn.customerName
                }

                let responseToken = jwt.sign(encrptData, process.env.JWT_SECRET, { expiresIn: "1d" })

                delete signIn.password;

                return res.status(200).json({ status: 200, message: 'Login Sucess', data: signIn, responseToken });
            }
            else {
                return res.status(400).json({ status: 400, message: 'invalid credentials', data: {} });
            }
        }
        else {
           return  res.status(500).json({ status: 400, message: 'Data is not found', data: {} });
        }
    } catch (error) {
        console.error('Data not found:', error);
        return res.status(500).json({ error: 'Data not found' });
    }
}

module.exports = { signUp, signIn }