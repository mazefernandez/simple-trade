// Handling authorization of users 
const user = require("../model/user")
// Register a new user
exports.register = async (req,res,next) => {
    const { username, password } = req.body
    // Checks if user entered a valid password length
    if (password.length < 8) {
        return res.status(400).json({message:"Password is less than 8 characters"})
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

// Login a user 
exports.login = async (req,res,next) => {
    const { username, password } = req.body
    // Check if username and password exists 
    if (!username || !password) {
        return res.status(400).json({
            message: "Please enter both Username and Password",
        })
    }
    try {
        // Search for User with matching username and password
        const login = await user.findOne({ username, password })

        if (!login) {
            res.status(401).json({
                message: "Login was not successful",
                error: "No User matching the credentials provided"
            })
        }
        else {
            res.status(200).json({
                message: "Login successful",
                user
            })
        }
    }
    // Error handling 
    catch (err) {
        res.status(400).json({
            message: "Login not successful",
            error: err.message
        })
    }
}