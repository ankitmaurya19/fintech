const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    firstName : {
        required : true ,
        type : String ,
        trim : true ,
        min : 3       
    },
    lastName : {
        type : String ,
        require : true ,
        trim : true ,
        min : 3
    },
    email : {
        type : String,
        required : true,
        trim : true ,
        lowercase : true
    },
    password : {
        type : String , 
        required : true
    }
} , {timestamps : true});

module.exports = mongoose.model('user' , userSchema);
