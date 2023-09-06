// Handling JWT authentication
const jwt = require("jsonwebtoken")

// jwt key
const JWT = "49065b777553cc1a50281e762756296851893029e96642824ecb932f3a59c6e6d9825af0a3da28fb"

// Authenticate admin user
exports.adminAuth = (req,res,next) => {
    const token = req.cookies.jwt
    if (token) {
        jwt.verify(token, JWT, (err, decodedToken) => {
            // Error handling for jwt 
            if (err) {
                return res.status(401).json({ 
                    message: "Not authorized"
                })
            } 
            else {
                if (decodedToken.role !== "admin") {
                    return res.status(401).json({
                        message: "Not authorized"
                    })
                }
                else {
                    // User is an admin 
                    next()
                }
            }
        })
    }
    else {
        return res.status(401).json({
            message: "No token available"
        })
    }
}

// Authenticate basic user
exports.userAuth = (req,res,next) => {
    const token = req.cookies.jwt 
    if (token) {
        jwt.verify(token,JWT, (err, decodedToken) => {
            // Error handling for jwt
            if (err) {
                return res.status(401).json({
                    message: "Not authorized"
                })
            } 
            else {
                if (decodedToken.role !== "basic") {
                    return res.status(401).json({
                        message: "Not authorized"
                    })
                }
                else {
                    // User is authorized to proceed
                    next()
                }
            }
        })
    }
    else {
        return res.status(401).json({
            message: "No token available"
        })
    }
}