const UserModle = require("../modules/UserModel")

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
        return res.json({ 
            success: true, 
            message: `${user.name} Login successful`
         })

    } catch (error) {
        console.log(error,"error in login")
        return res.status(500).send({
            success: false,
            message: error,
        })
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
module.exports = { register, login, users, logout }