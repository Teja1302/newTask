const sequelize = require("../config/dbconfig")

const ProductModel = require('../model/productModel')

const stripe = require('stripe')('sk_test_51PGeplSIhpgN2qXaZLdbYKmfV4y739PW5pXhiBRTsgsi4Sk06A3YwcnO6HU0DHWdjtPZ5FfLeUINhYc32RY1KDxu00CI1fxW9X')


const ProductCreate = async function (req, res) {
    try {
        const params = req.body;
        createdAt = new Date()
        let Products = await stripe.products.list()

        Products =  Products?.data.filter(x=>x.name == params.productName)

        console.log("product", Products)

        if (Products.length > 0) {
            return res.status(401).json({ message: "Product  already exist" });
        }
        let createProduct = await stripe.products.create({
            name: params.productName, 
            description: params.description,
        });
        console.log(createProduct)
        

        params.stripeProductId = createProduct.id

        const newProduct= await ProductModel.create(params);

       return res.status(201).json(newProduct);
    } catch (error) {
        console.error('Error creating product:', error);
        res.status(500).json({ message: 'Could not create product', error: error.message });
    }
}
module.exports = ProductCreate