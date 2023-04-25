const jwt = require("jsonwebtoken");
const SECRET = process.env.SECRET_KEY;


module.exports.authenticate = (req, res, next) => {
    console.log("COOKIES",req.cookies)
    jwt.verify(req.cookies.userToken,SECRET, (err, payload) => {
        if(err){
            console.log("ERR!!", err)
            res.status(401).json({verified: false});
        }else{
            console.log(payload)
            req.jwtpayload = payload
            next();
        }
    })
}