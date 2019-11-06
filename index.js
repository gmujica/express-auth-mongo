const express = require('express');
const app = express();

//Import Routes
const authRoute= require('./routes/auth');

//Route Middlewares
app.use('/api/user', authRoute);

app.listen(4000, () => console.log('Server is Running on 4000'));

