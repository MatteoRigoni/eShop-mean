// imports
const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
const authJwt = require('./helpers/jwt');
const errorHandler = require('./helpers/errorHandler');

app.use(cors());
app.options('*', cors());

// environement
require('dotenv').config();
const environment = process.env.ENVIRONMENT;
require('dotenv').config({ path: `.env.${environment}` });

// middleware
app.use(express.json());
app.use(morgan('tiny'));
app.use(authJwt());
app.use('/public/uploads', express.static(__dirname + '/public/uploads'));
app.use(errorHandler);

// routers
const categoriesRoutes = require('./routes/categories');
const productsRoutes = require('./routes/products');
const usersRoutes = require('./routes/users');
const ordersRoutes = require('./routes/orders');

const API_BASE_URL = process.env.API_URL;

app.use(`${API_BASE_URL}/categories`, categoriesRoutes);
app.use(`${API_BASE_URL}/products`, productsRoutes);
app.use(`${API_BASE_URL}/users`, usersRoutes);
app.use(`${API_BASE_URL}/orders`, ordersRoutes);

mongoose.connect(process.env.CONNECTION_STRING_DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'eshop-mean'
})
    .then(() => {
        console.log("database connection estabilished");
    })
    .catch((err) => {
        console.log("database connection failed: " + err);
    })

app.listen(3000, () => {
    console.log("server is running!");
});