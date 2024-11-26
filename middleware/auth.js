const jwt = require("jsonwebtoken");
require("dotenv").config();

const verifyToken = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        // Check if Authorization header exists
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({
                success: false,
                message: "Authorization header missing or malformed",
            });
        }

        // Extract the token from the "Bearer " prefix
        const token = authHeader.split(" ")[1];

        // Verify the token
        jwt.verify(token, process.env.JWT_SECRET || "default-secret-key", (err, decoded) => {
            if (err) {
                return res.status(403).json({
                    success: false,
                    message: "Invalid or expired token",
                });
            }

            // Attach user information from token to the request object
            req.user = decoded;
            next(); // Pass control to the next middleware
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong during token verification",
            error: error.message,
        });
    }
};

module.exports = {
    verifyToken,
};
