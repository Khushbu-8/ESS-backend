const jwt = require('jsonwebtoken')
require ("dotenv").config();

const veryfyToken = async (req, res, next) => {
    const token = req.headers.authorization || req.cookies.token;
    if (!token) return res.status(403).send({
        success: false,
        message: "Blank token"
    });
    newtoken = token.slice(7);
    // console.log(newtoken, "newtoken");
    // console.log(req.cookies.token, "cookies");
    
console.log(process.env.JWT_SECRET);

    jwt.verify(newtoken,process.env.JWT_SECRET, (err, user) => {
        if(err){
            console.log(err ,"err");
            
        }
        if (err) return res.status(403).send({
            success: false,
            message: "Invalid token"
        });

        console.log(user ," users");
        
        req.user = user;
        next();
    })
}

module.exports = {
    veryfyToken
}