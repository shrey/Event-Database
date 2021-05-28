const express = require('express')
const homeRoutes = require('./routes/home');
const authRoutes = require('./routes/authentication');
const eventRoutes = require('./routes/event');
const commentRoutes = require('./routes/comments');
const registerRoutes = require('./routes/register');
const friendRoutes = require('./routes/friends');
const subscriptionsRoutes = require('./routes/subscriptions');
const ratingRoutes = require('./routes/rating');
const messageRoutes = require('./routes/message');

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
app.use('/user',authRoutes);
app.use('/events',eventRoutes);
app.use('/register',registerRoutes);
app.use('/comment',commentRoutes);
app.use('/friend',friendRoutes);
app.use(subscriptionsRoutes);
app.use(ratingRoutes);
app.use(messageRoutes);

app.listen(process.env.PORT || 3000, () => {
    console.log(`Server listening on Port ${process.env.PORT || 3000}`)
})