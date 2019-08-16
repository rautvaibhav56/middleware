const express = require('express');
const db = require('./db');
const utils = require('./utils');

const router = express.Router();

router.get('/food', (request, response) => {
    const connection = db.connect();
    const statement = `select id,food_Type,Quantity,price,food_Description from Food`;
    connection.query(statement, (error, result) => {
        connection.end();
        response.send(utils.createResponse(error, result));
    }) 
});

router.post('/food', (request, response) => {
    const {food_Type, Quantity, price, food_Description} = request.body;
    const connection = db.connect();
    const statement = `insert into Food
            (food_Type, Quantity, price, food_Description ) values 
            ('${food_Type}', '${Quantity}', '${price}', '${food_Description}')`;
    connection.query(statement, (error, result) => {
        connection.end();
        response.send(utils.createResponse(error, result));
    })
});


router.put('/food/:id', (request, response) => {
    const id = request.params.id;
    const {food_Type, Quantity, price, food_Description} = request.body;
    const connection = db.connect();
    const statement = `update Food
        set
        food_Type = '${food_Type}',
        Quantity = '${Quantity}',
        price = '${price}',
        food_Description = '${food_Description}'
            where id = ${id}`;
    connection.query(statement, (error, result) => {
        connection.end();
        response.send(utils.createResponse(error, result));
    })
});

router.delete('/food/:id', (request, response) => {
    const id = request.params.id;
    const connection = db.connect();
    const statement = `delete from Food where id = ${id}`;
    connection.query(statement, (error, result) => {
        connection.end();
        response.send(utils.createResponse(error, result));
    })
});


module.exports = router;