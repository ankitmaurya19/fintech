const mongoose = require('mongoose');

const logSchema = mongoose.Schema({
    path : {
        type : String ,
        required : true
    } ,
    method : {
        type : String ,
        required : true
    } ,
    responseStatus : {
        type : Number ,
        require : true
    }
} , {timestamps : true});

module.exports = mongoose.model('log' , logSchema);
