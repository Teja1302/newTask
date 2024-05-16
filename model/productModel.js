const { Sequelize } = require('sequelize');

const sequelize = require("../config/dbconfig");

const Product = sequelize.define('Product', {
    productId: {
        type: Sequelize.BIGINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    stripeProductId: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    productName: {
        type: Sequelize.STRING,
        allowNull: false
    },
   description: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    availableQuantity: {
        type: Sequelize.INTEGER,
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
module.exports = Product;
