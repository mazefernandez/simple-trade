const mongoose = require("mongoose")

const storeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    // Reference to user model
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: user,
        required: true, 
        index: true
    },
    address: String,
    date: { // Registration of store on the application
        type: Date,
        default: Date.now,
    },
}, { autoIndex: true }) 

const store = mongoose.model("store", storeSchema)
module.exports = store