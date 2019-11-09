const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');

//Import Routes
const authRoute= require('./routes/auth');

//dotenv.config();    

//connecttoDb
mongoose.connect(
    //process.env.DB_CONNECT,
    'mongodb+srv://gmujica:6842@cluster0-ivcbw.mongodb.net/test?retryWrites=true&w=majority', 
    { 
        useNewUrlParser: true, 
        useUnifiedTopology: true 
    }, 
    () => console.log('connected to DB')
);

//Middelware
app.use(express.json());
//Route Middlewares
app.use('/api/user', authRoute);

app.listen(4000, () => console.log('Server is Running on Port: 4000'));

