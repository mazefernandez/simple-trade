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

// Update store details
exports.updateStore = async (req,res) => {
    const { name, address, email, id } = req.body
    try {
        const addedStore = await store.findById(id) 
        addedStore.name = name
        addedStore.address = address
        addedStore.email = email

        const result = await addedStore.save()
        res.status(201).json({
            message:"Store was updated successfully"
        })
    }
    catch (err) {
        res.status(400).json({
            message: "Update store was not successful",
            error: err.message
        })
    }
}

