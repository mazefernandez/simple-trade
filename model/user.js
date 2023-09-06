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
    role: {
        type: String,
        default: "basic",
        required: true
    },
}, { autoIndex: true }) 

const user = mongoose.model("user", userSchema)
module.exports = user