const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const app = express();
dotenv.config();

// Route
const Registration = require('./src/routes');


app.use(bodyParser.urlencoded({extended : true}));
const url = "mongodb+srv://"+process.env.USER+":"+process.env.PASSWORD+"@cluster0.zrfo4.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(url , {useNewUrlParser : true}).then(() => {
    console.log('Databse Connected');
});

app.use('/user' , Registration);

app.get('/' , (req , res) => {
    res.send('Hello');
})

app.listen(3000 || process.env.PORT , () => {
    console.log(`Server is running on port ${process.env.PORT}`);
})