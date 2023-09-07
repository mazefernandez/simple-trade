// Handling authorization of users 
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const user = require("../model/user")

// jwt key
const JWT = "49065b777553cc1a50281e762756296851893029e96642824ecb932f3a59c6e6d9825af0a3da28fb"

// Register a new user
exports.register = async (req,res) => {
    const { username, password } = req.body
    // Checks if username and password exist 
    if (!username || !password) {
        return res.status(400).json({
            message:"Please enter both Username and Password"
        })
    }
    // Checks if user entered a valid password length
    if (password.length < 8) {
        return res.status(400).json({
            message:"Password is less than 8 characters"
        })
    }
    // Checks if username already exists
    const existingUser = await user.findOne({username})
    if (existingUser) {
        return res.status(400).json({
            message: "Username already taken"
        })
    } 
    // Encrypt the password 
    bcrypt.hash(password, 10).then(async (hash) => {
        await user.create({
            username,
            password: hash
        }).then(registeredUser => {

            const maxAge = 5 * 60 * 60 
            const token = jwt.sign(
                { userId: registeredUser._id, username, role: registeredUser.role },
                JWT, 
                {
                    expiresIn: maxAge
                }
            )
            res.cookie("jwt", token, {
                httpOnly: true,
                maxAge: maxAge * 1000, 
            })
            res.status(200).json({
                message: "User created successfully",
                registeredUser: registeredUser._id
            })
        }).catch((err) => res.status(400).json({
            message: "User not created successfully",
            error: err.message 
        })) 
    })
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
        // Search for User with matching username
        const registeredUser = await user.findOne({ username })

        if (!registeredUser) {
            res.status(401).json({
                message: "Login was not successful",
                error: "No existing User"
            })
        }
        else {
            // Check if password matches hash password
            bcrypt.compare(password, registeredUser.password).then(function (match) {
                match
                    ? res.status(200).json({
                        message: "Login successful",
                        registeredUser
                    })
                    : res.status(401).json({
                        message: "Login was not successful",
                        error: "Wrong credentials"
                    })
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
        return res.status(400).json({
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
// Delete a user
exports.deleteUser = async (req,res) => {
    const { userId } = req.body
    if (!userId) {
        return res.status(400).json({
            message: "No userId"
        })
    }
    try {
        // Check if user exists 
        const registeredUser = await user.findByIdAndDelete(userId)
        if (!registeredUser) {
            res.status(400).json({
                message: "User not found"
            })
        }
        // Successful delete 
        else {
            res.status(201).json({
                message: "User delete was successful"
            })
        }
    }
    // Error handling for delete user
    catch (err) {
        res.status(400).json({
            message: "An error occurred",
            error: err.message
        })
    }
}

//@TODO 
//add password strength
//add update password 
