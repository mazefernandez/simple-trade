// Handles requests for store 
const store = require("../model/store")

// Add a store
exports.addStore = async (req,res) => {
    const { name, email, userId, address } = req.body
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
    const { id, name, address, email } = req.body
    if (!name) {
        return res.status(400).json({
            message: "No name provided"
        })
    }
    try {
        const addedStore = await store.findById(id) 
        addedStore.name = name
        addedStore.address = address
        addedStore.email = email

        await addedStore.save()
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

// Delete a store
exports.deleteStore = async (req,res) => {
    const { id } = req.body
    if (!id) {
        return res.status(400).json({
            message: "No storeId"
        })
    }
    try {
        // Check if store exists 
        const addedStore = await store.findByIdAndDelete(id)
        if (!addedStore) {
            res.status(400).json({
                message: "Store not found"
            })
        }
        // Successful delete 
        else {
            res.status(201).json({
                message: "Store delete was successful"
            })
        }
    }
    // Error handling for delete store
    catch (err) {
        res.status(400).json({
            message: "An error occurred",
            error: err.message
        })
    } 
}

