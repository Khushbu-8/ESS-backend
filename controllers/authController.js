const UserModle = require("../modules/UserModel")
const jwt = require('jsonwebtoken')
require ("dotenv").config();
const bcrypt = require("bcryptjs");



const register = async (req, res) => {
    try {
        const { name, email, password, cpassword, contact, address } = req.body
        //   console.log(req.body);
        if (!name || !email || !password || !cpassword || !contact || !address) {
            return res.status(400).send({
                success: false,
                message: "Please fill all the fields"
            })
        }
        if (password !== cpassword) {
            return res.status(400).send({
                success: false,
                message: "Password and Confirm Password doesn't match"
            })
        }
        const userExist = await UserModle.findOne({ email: email })
        if (userExist) {
            return res.status(400).send({
                success: false,
                message: "Email already exist"
            })
        }
        let user = await UserModle.create({
            name: name,
            email: email,
            password: password,
            cpassword: cpassword,
            contact: contact,
            address: address,
        })
        return res.status(200).send({
            success: true,
            message: "User register successfully",
            user: user
        })

    } catch (error) {
        return res.status(500).send({
            success: false,
            message: error,
        })

    }
}
// const login = async (req, res) => {
//     try {
//         const { email, password } = req.body
//         if (!email || !password) {
//             return res.status(400).send({
//                 success: false,
//                 message: "Email and Password are required"
//             })
//         }

//         const user = await UserModle.findOne({ email: email })
//         if (!user || user.password != password) {
//             return res.status(400).json({
//                 success: false,
//                 message: "Invalid Email or Password"
//             })
//         }
//         const token = await jwt.sign({ user: user }, process.env.JWT_SECRET,
//             {
//                 expiresIn: '24h'
//             }
            
//         );
//         res.cookie("token", token, {
//             httpOnly: true, // Prevents JavaScript access
//             secure: true, // Set true in production (requires HTTPS)
//         });

//         return res.json({ 
//             success: true, 
//             message: `${user.name}Login successful`,
//             token: token
//          })

//     } catch (error) {
//         return res.status(500).send({
//             success: false,
//             message: error,
//         })
//     }
// }
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const UserModel = require("../models/UserModel"); // Replace with actual model

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate input
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and Password are required",
            });
        }

        // Find user by email
        const user = await UserModel.findOne({ email: email });
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Invalid Email or Password",
            });
        }

        // Compare passwords
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({
                success: false,
                message: "Invalid Email or Password",
            });
        }

        // Generate JWT
        const token = jwt.sign(
            { userId: user._id }, // Include only necessary info
            process.env.JWT_SECRET || "secret-key",
            { expiresIn: "24h" }
        );

        // Set token as a cookie
        res.cookie("token", token, {
            httpOnly: true, // Prevents JavaScript access
            secure: process.env.NODE_ENV === "production", // Set true in production
            sameSite: "Strict", // Helps prevent CSRF
        });

        return res.status(200).json({
            success: true,
            message: `${user.name} logged in successfully`,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong. Please try again later.",
            error: error.message,
        });
    }
};


const dashboard =  (req, res) => {
    const token = req.cookies.token;
  
    if (!token) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }
  
    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      res.json({ success: true, message: "Welcome to the dashboard", user: decoded });
    } catch (err) {
      res.status(401).json({ success: false, message: "Invalid token" });
    }
}

const users = async (req, res) => {
    try {
        const user = await UserModle.find({})
        return res.status(200).send({
            success: true,
            message: "User Fetch successfully",
            user: user
        })
    } catch (error) {
        return res.status(500).send({
            success: false,
            message: error,
        })
    }

}
const logout = async (req, res) => {
    try {
        res.clearCookie('token');
        return res.status(200).send({
            success: true,
            message: "User logout successfully",
        })
    } catch (error) {
        return res.status(500).send({
            success: false,
            message: error,
        })
    }

}
module.exports = { register, login, users, logout ,dashboard}