const express = require('express');
const cors = require('cors');
require('dotenv');

const scheduler = require('./scheduler/reminder');

const app = express();
app.use(cors());

scheduler.start();


const SERVER_PORT = process.env.SERVER_PORT;
app.listen((req, resp) =>{
    console.log(`Server started on: ${SERVER_PORT}`);
}, SERVER_PORT);