const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

//load envi variables
dotenv.config({path:'./config/config.env'});

// connected to database
connectDB();

const app = express();

//body parser
app.use(express.json());

//enable cors
app.use(cors());

//set static folder
app.use(express.static(path.join(__dirname, 'views')));

//routes
app.use('/api/parkings', require('./routes/parkings'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`server running in ${process.env.NODE_ENV} mode on port ${PORT} `)
  }); 
  