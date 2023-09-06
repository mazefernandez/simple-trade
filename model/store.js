const mongoose = require("mongoose")

const storeSchema = new mongoose.Schema({
    name: String,
    address: String,
    date: { // Registration of store on the application
        type: Date,
        default: Date.now,
    },
}) 

const store = mongoose.model("store", storeSchema)
module.exports = store