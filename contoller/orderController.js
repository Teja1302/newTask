
const Order = require('../model/orderModel');
const twilioClient = require('../config/twilio')
const nodemailer = require('nodemailer');

const { sendEmailNotification } = require("../utils/emailService")
//const transporter = nodemailer.createTransport(require('../config/nodemailer'));


async function createOrder(req, res) {
    try {
        let params = req.body;

        const orderReferenceId = await generateOrderReferenceId();
        console.log("test",orderReferenceId)

        params.orderReferenceId = orderReferenceId

        const order = await Order.create(params)


        sendWhatsAppMessage(order);
        let mailObject = {
            email: "chittemteja401@gmail.com",
            subject: "Order",
           // text: "order created",
            text: `Your order with reference ID ${orderReferenceId} has been successfully placed.`
        }
        sendEmailNotification(mailObject);

        res.status(201).json({ message: 'Order placed successfully', order });
    } catch (error) {
        console.error('Error creating order:', error);
        res.status(500).json({ error: 'An error occurred while creating the order' });
    }
}

async function generateOrderReferenceId() {
    const count = await Order.count();
    return `#ORD${(count + 1).toString().padStart(4, '0')}`;
}

function sendWhatsAppMessage(order) {
    twilioClient.messages.create({
        from: 'whatsapp:+14155238886',
        to: `whatsapp:${order.contactNumber}`,
        body: `Your order with reference ID ${order.orderReferenceId} has been successfully placed.`
    });
}


module.exports = { createOrder };
