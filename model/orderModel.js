const { Sequelize } = require('sequelize');

const sequelize = require("../config/dbconfig"); 

const Order = sequelize.define('Order', {
    orderId: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    orderReferenceId: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    productId: {
        type: Sequelize.STRING,
        allowNull: false
    },
    customerId: {
        type: Sequelize.STRING,
        allowNull: false
    },
    paymentType: {
        type: Sequelize.STRING,
        allowNull: false
    },
    orderAddress: {
        type: Sequelize.STRING,
        allowNull: false
    },
    contactNumber: {
        type: Sequelize.STRING,
        allowNull: false
    },
    quantity: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    subtotal: {
        type: Sequelize.FLOAT,
        allowNull: false
    },
    invoiceURL: {
        type: Sequelize.STRING
    },
    cgst: {
        type: Sequelize.FLOAT
    },
    sgst: {
        type: Sequelize.FLOAT
    },
    igst: {
        type: Sequelize.FLOAT
    },
    total: {
        type: Sequelize.FLOAT,
        allowNull: false
    },
    status: {
        type: Sequelize.STRING,
        defaultValue: 'Pending'
    },
    isDeleted: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    }
});
module.exports = Order