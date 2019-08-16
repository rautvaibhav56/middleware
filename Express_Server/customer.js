const express = require('express');
const db = require('./db');
const utils = require('./utils');

const router = express.Router();

router.get('/customer', (request, response) => {
    const connection = db.connect();
    const statement = `select Customer_Id,first_name,last_name,email, contact,address,pin,gender,state,country from Customer`;
    connection.query(statement, (error, result) => {
        connection.end();
        response.send(utils.createResponse(error, result));
    }) 
});
router.post('/customer', (request, response) => {
    const {first_name, last_name, email, password,contact,address,pin,gender,state,country} = request.body;
    const connection = db.connect();
    const statement = `insert into Customer 
            (first_name, last_name, email, password,contact,address,pin,gender,state,country ) values 
            ('${first_name}', '${last_name}', '${email}', '${password}','${contact}','${address}','${pin}','${gender}','${state}','${country}')`;
    connection.query(statement, (error, result) => {
        connection.end();
        response.send(utils.createResponse(error, result));
    })
});
router.put('/customer/:Customer_Id', (request, response) => {
    const Customer_Id = request.params.Customer_Id;
    const {first_name, last_name, email, password,contact,address,pin,gender,state,country} = request.body;
    const connection = db.connect();
    const statement = `update Customer
        set
        first_name = '${first_name}',
        last_name = '${last_name}',
        email = '${email}',
        password = '${password}',
        contact = '${contact}',
        address = '${address}',
        pin = '${pin}',
        gender = '${gender}',
        state = '${state}',
        country = '${country}'

            where Customer_Id = ${Customer_Id}`;
    connection.query(statement, (error, result) => {
        connection.end();
        response.send(utils.createResponse(error, result));
    })
});
router.delete('/customer/:Customer_Id', (request, response) => {
    const Customer_Id = request.params.Customer_Id
    const connection = db.connect();
    const statement = `delete from Customer where Customer_Id = ${Customer_Id}`;
    connection.query(statement, (error, result) => {
        connection.end();
        response.send(utils.createResponse(error, result));
    })
});


module.exports = router;