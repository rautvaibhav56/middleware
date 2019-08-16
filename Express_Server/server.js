const express = require('express');
const bodyParser = require('body-parser');
const foodRouter = require('./food');
const userRouter = require('./user');
const customerRouter = require('./customer');

const app = express();
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

// routers
app.use(foodRouter);
app.use(userRouter);
app.use(customerRouter);

app.listen(3000, '0.0.0.0', () => {
    console.log(`Server started on 3000`);
});