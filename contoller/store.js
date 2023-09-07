// Handles requests for store 
const store = require("../model/store")

// Add a store
exports.addStore = async (req,res) => {
    const { name, userId, address } = req.body
    if (!name) {
        return res.status(400).json({
            message: "No name provided"
        })
    }
    try {
        await store.create({
            name, 
            userId, 
            address
        }).then(addedStore => {
            res.status(200).json({
                message: "Store successfully created",
                addedStore
            })
        })
    }
    catch(err) {
        res.status(401).json({
            message: "Create store not successful",
            error: err.message
        })
    }
}


