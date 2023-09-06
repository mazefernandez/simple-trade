// User Schema
const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        minlength: 8,
        required: true
    },
    // Used for authentication 
    role: {
        type: String,
        default: "basic",
        required: true
    },
}) 

// Allow other files to access "user"
const user = mongoose.model("user", userSchema)
module.exports = user