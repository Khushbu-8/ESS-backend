const jwt = require('jsonwebtoken')
require ("dotenv").config();

const veryfyToken = async (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) return res.status(403).send({
        success: false,
        message: "Blank token"
    });
    newtoken = token.slice(7);
    // console.log(newtoken);

    jwt.verify(newtoken, process.env.JWT_SECRET, (err, user) => {

        if (err) return res.status(403).send({
            success: false,
            message: "Invalid token"
        });
        req.user = user;
        next();
    })
}

module.exports = {
    veryfyToken
}