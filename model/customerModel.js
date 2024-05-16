const { Sequelize } = require('sequelize');

const sequelize = require("../config/dbconfig");

const Customer = sequelize.define('Customer', {
    customerId: {
        type: Sequelize.BIGINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    stripeCustomerId: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    customerName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    customerEmail: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    mobileNumber: {
        type: Sequelize.STRING,
        allowNull: false
    },
    address: {
        type: Sequelize.STRING,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    status: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue : "CREATED"
    },
    isDeleted: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    }
});
module.exports = Customer;
