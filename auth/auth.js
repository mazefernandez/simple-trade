// Handling authorization of users 
const user = require("../model/user")

exports.register = async (req,res,next) => {
    const { username, password } = req.body
    // Checks if user entered a valid password length
    if (password.length < 8) {
        return res.status(400).json({message:"Password is less than 8 characters."})
    }
    try {
        await user.create({
            username,
            password,
        }).then(registeredUser => res.status(200).json({
            message: "User created successfully",
            registeredUser,
        }))
    }
    // Error handling 
    catch (err) {
        res.status(401).json({
            message: "User not created successfully",
            error: err.message,
        })
    }
}