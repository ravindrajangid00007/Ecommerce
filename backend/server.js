const express = require('express');
const app = express();
const dotenv = require('dotenv');
const path = require('path');
const errorMiddleware = require('./middleware/error');
dotenv.config({path: path.join(__dirname, 'config/config.env')});
const db = require('./config/database');
app.use(express.json());

app.use('/api/v1' , require('./routes'))
// middleware for error handling
app.use(errorMiddleware);
app.listen(process.env.PORT , ()=>{
    console.log(`listening on port ${process.env.PORT}`);
})