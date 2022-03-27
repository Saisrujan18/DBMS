const express = require('express');
const db = require('./config/db')
const cors = require('cors')

const app = express();
const PORT = 3002;
app.use(cors());
app.use(express.json())



app.listen(() => {
    console.log(`Server Listening on Port ${PORT}`)
})