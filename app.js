const express = require('express');
//const bodyParser = require('body-parser');
const app = express();

app.use(express.json());

const dotenv = require('dotenv')

dotenv.config()

const db = require('./config/dbconfig');

const router = require('./routes/CustomerRouter');
 const productrouter=require('./routes/productRouter')
 const orderRouter=require('./routes/orderRouter')

db.sync({ force: false })
    .then(e => console.log("Table Created"))
    .catch(e => console.log("error", e));

require('./model/customerModel')
require('./model/productModel')

app.use('/api', router);
app.use('/api', productrouter);
app.use('/api',orderRouter)
app.listen(8000, console.log("server connected at port 8000!"))