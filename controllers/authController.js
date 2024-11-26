const UserModle = require("../modules/UserModel")
const jwt = require('jsonwebtoken')



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
const login = async (req, res) => {
    try {
        const { email, password } = req.body
        if (!email || !password) {
            return res.status(400).send({
                success: false,
                message: "Email and Password are required"
            })
        }

        const user = await UserModle.findOne({ email: email })
        if (!user || user.password != password) {
            return res.status(400).json({
                success: false,
                message: "Invalid Email or Password"
            })
        }
        const token = await jwt.sign({ user: user }, "secret-key",
            {
                expiresIn: '24h'
            }
        );
        res.cookie("token", token, {
            httpOnly: true, // Prevents JavaScript access
            secure: false, // Set true in production (requires HTTPS)
            sameSite: "lax",
        });

        return res.json({ 
            success: true, 
            message: "Login successful" });

    } catch (error) {
        return res.status(500).send({
            success: false,
            message: error,
        })
    }
}

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
        res.clearCookie('auth');
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