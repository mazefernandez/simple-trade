// Handling authorization of users 
const user = require("../model/user")
// Register a new user
exports.register = async (req,res) => {
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
            registeredUser
        }))
    }
    // Error handling for registering user
    catch (err) {
        res.status(401).json({
            message: "User not created successfully",
            error: err.message
        })
    }
}
// Login a user 
exports.login = async (req,res) => {
    const { username, password } = req.body
    // Check if username and password exists 
    if (!username || !password) {
        return res.status(400).json({
            message: "Please enter both Username and Password"
        })
    }
    try {
        // Search for User with matching username and password
        const registeredUser = await user.findOne({ username, password })

        if (!registeredUser) {
            res.status(401).json({
                message: "Login was not successful",
                error: "No User matching the credentials provided"
            })
        }
        else {
            res.status(200).json({
                message: "Login successful",
                registeredUser
            })
        }
    }
    // Error handling for login
    catch (err) {
        res.status(400).json({
            message: "Login not successful",
            error: err.message
        })
    }
}
// Update a user to admin 
exports.update = async (req,res) => {
    const { userId, role } = req.body 
    // Check if userId and role exists
    if (!userId || !role) {
        res.status(400).json({
            message: "No userId or role"
        })
    }
    else if (role === "admin") {
        try {
            const registeredUser = await user.findById(userId) 
            // Updates basic user to admin 
            if (registeredUser.role != "admin") {
                registeredUser.role = role
                const result = await registeredUser.save()
                if (result.role != "admin") {
                    res.status(400).json({
                        message: "An error occurred"
                    })
                }
                // Update successful
                else {
                    res.status(201).json({
                        message: "User was updated to admin"
                    })
                }
            }
            else {
                res.status(400).json({
                    message: "User is already an Admin"
                })
            }
        }
        
        // Error handling for update to admin
        catch (err) { 
            res.status(400).json({
                message: "An error occurred",
                error: err.message
            })
        }
    }
    // Role sent was not admin 
    else {
        res.status(400).json({
            message: "Role is not Admin"
        })
    }
}

exports.deleteUser = async (req,res) => {
    const { userId } = req.body
    if (!userId) {
        return res.status(400).json({
            message: "No userId"
        })
    }
    try {
        const registeredUser = await user.findByIdAndDelete(userId)
        if (!registeredUser) {
            res.status(400).json({
                message: "User not found"
            })
        }
        else {
            res.status(201).json({
                message: "User delete was successful"
            })
        }
    }
    catch (err) {
        res.status(400).json({
            message: "An error occurred",
            error: err.message
        })
    }
}
