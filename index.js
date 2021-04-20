const express = require('express')
const homeRoutes = require('./routes/home');

// require('dotenv').config()
// var logger = require('morgan')
var bodyParser = require('body-parser')

const app = express()
// app.use(logger('dev'));
app.use(express.static(__dirname + '/dist'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Database Connection
const mySqlConnection = require('./utils/db')
const myConnection = mySqlConnection()

myConnection.connect((err)=>{
    if(!err) {
        console.log('Database mounted')
    } else {
        throw err
    }
})

app.use(homeRoutes);

app.listen(process.env.PORT || 3000, () => {
    console.log(`Server listening on Port ${process.env.PORT || 3000}`)
})