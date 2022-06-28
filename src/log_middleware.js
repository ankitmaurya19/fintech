const express = require('express');
const Log = require('./log_model');

exports.logMiddleware = (reqType) => {

    return (req , res) => {
        console.log(res.statusCode);
        const log = new Log({
            path : "user/" + reqType , 
            method: reqType ,
            responseStatus : res.statusCode
        });
        log.save()
    }

}

var months = ["Jan" , "Feb" , "Mar" , "Apr" , "May" , "Jun" , "Jul" , "Aug" , "Sep" , "Oct" , "Nov" , "Dec"];

const getMonth = (s) => {
    for(let i = 0 ; i < 12 ; i++)
    {
        if(months[i] === s)
        return i + 1;
    }
}

const checker = (s) => {
    return (s === "login");
}
exports.showLogDetails = (request , response) => {
    const startDate = request.query.from_date;
    const endDate = request.query.to_date;
    var y1 , m1 , d1 , y3 , m3 , d3;

    y1 = parseInt(startDate.substr(0 , 4));
    y3 = parseInt(endDate.substr(0 , 4));
    m1 = parseInt(startDate.substr(5 , 2));
    m3 = parseInt(endDate.substr(5 , 2));
    d1 = parseInt(startDate.substr(8 , 2));
    d3 = parseInt(endDate.substr(8 , 2));

    Log.find({} , (err , res) => {
        if(err) {
            response.status(400).send('Please try again!');
        } else {
            var result = {}, login = 0 , sign = 0;
            for(let i = 0; i < res.length ; i++)
            {
                let yr = res[i].createdAt;
                if(yr === undefined) continue;
                yr = yr.toString();
                var y2 , m2 , d2;
                y2 = parseInt(yr.substr(11 , 4));
                m2 = parseInt(getMonth(yr.substr(4 , 3)));
                d2 = parseInt(yr.substr(8 , 2));
                console.log(d1 , m1 , y1);
                console.log(d2 , m2 , y2);
                console.log(d3 , m3 , y3);
                if(y1 < y2 && y2 < y3) {
                    ((checker(res[i].method)) ? login++ : sign++)
                }
                else if(y1 == y2 && y2 == y3)
                {
                    if(m1 < m2 && m2 < m3) {
                        ((checker(res[i].method)) ? login++ : sign++)
                    } else if(m1 == m2 && m2 == m3) {
                        if(d1 <= d2 && d2 <= d3) {
                            ((checker(res[i].method)) ? login++ : sign++)
                        }
                    } else if(m1 == m2) {
                        if(d1 <= d2) {
                            ((checker(res[i].method)) ? login++ : sign++)
                        }
                    } else if(m2 == m3) {
                        if(d2 <= d3) {
                            ((checker(res[i].method)) ? login++ : sign++)
                        }
                    }
                }
                else if(y1 == y2)
                {
                    if(m1 < m2) {
                        ((checker(res[i].method)) ? login++ : sign++)
                    } else if(m1 == m2 && d1 <= d2) {
                        ((checker(res[i].method)) ? login++ : sign++)
                    }
                } 
                else if(y2 == y3)
                {
                    if(m2 < m3) {
                        ((checker(res[i].method)) ? login++ : sign++)
                    } else if(m2 == m3 && d2 <= d3) {
                        ((checker(res[i].method)) ? login++ : sign++);
                    }
                }
            }
            result.total_login_count = login;
            result.total_signup_count = sign;
            response.status(200).send(result);
        }
    })
}
