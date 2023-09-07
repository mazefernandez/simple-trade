// Store Schema
const mongoose = require("mongoose")
const user = require("./user")

const storeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: String,
    // Reference to user model
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: user,
        required: true, 
        index: true
    },
    address: String,
    // Registration of store on the application
    date: { 
        type: Date,
        default: Date.now,
    },
}) 

// Allow other files to access "store"
const store = mongoose.model("store", storeSchema)
module.exports = store

//@TODO 
//add phone validation 