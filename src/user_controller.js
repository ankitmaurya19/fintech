const User = require('./model');
const jwt = require('jsonwebtoken')

exports.signup = (req , res , next) => {
    User.findOne({email : req.body.email} , (error , result) => {
        if(error) {
            res.status(504).send('Something Went wrong')
        } else if(result) {
            res.status(400).send("User aready exists");
        } else {
            const user = new User(
                req.body
            );
            user.save((err , data) => {
                if(err) {
                    res.status(400).send("Something went wrong");
                } else {
                    res.status(200).send({user : data});
                }
            })
        }
        next();
    })
}


exports.login = (req , res , next) => {
    User.findOne({email:req.body.email} , (error , result) => {
        if(error) {
            res.status(504).write('Please try again');
        } else if (result) {
            if(result.password === req.body.password) {
                const token = jwt.sign({_id : result._id} , 'secretkey' , {expiresIn : '1h'});
                res.status(200).send({jsonWebToken : token});
            } else {
                res.status(400).send('Wrong password');
            }
        } else {
            res.status(400).send('User does not exist');
        }
        next();
    })
}

