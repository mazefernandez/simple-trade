// Handles requests for store 
const mongoose = require("mongoose")
const store = require("../model/store")

// Get store details
exports.getStore = async (req,res) => {
    const { id } = req.body
    if (!id) {
        return res.status(400).json({
            message: "No storeId"
        })
    }
    try {
        const addedStore = await store.findById(id)
        if (!addedStore) {
            res.status(401).json({
                message: "Retrieve store was not successful",
                error: "No existing Store"
            })
        }
        else {
            res.send(addedStore)
        }
    }
    catch (err) {
        res.status(400).json({
            message: "Retrieve store was not successful",
            error: err.message
        })
    }
}

// Get all stores
exports.getStores = async (req,res) => {
    const stores = await store.find({})

    try {
        res.send(stores)
    }
    catch (err) {
        res.status(500).json({
            message: "Retrieve all stores was not successful",
            error: err.message
        })
    }
}

// Get specific stores under a user
exports.getUserStores = async (req,res) => {
    const { id } = req.body
    if (!id) {
        return res.status(400).json({
            message: "No userId"
        })
    }
    try {
        const stores = await store.find({userId: id})

        if (!stores) {
            return res.status(401).json({
                message: "Retrieve all user stores was not successful",
                error: "No existing User stores"
            })
        }
        else {
            res.send(stores)
        }
    }
    catch (err) {
        res.status(400).json({
            message: "Retrieving all user stores was not successful",
            error: err.message
        })
    }
}

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
            email,
            userId, 
            address
        }).then(addedStore => {
            res.status(201).json({
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
    const { id, name, email, address } = req.body
    if (!name) {
        return res.status(400).json({
            message: "No name provided"
        })
    }
    try {
        const addedStore = await store.findById(id) 
        addedStore.name = name
        addedStore.email = email
        addedStore.address = address

        await addedStore.save()
        res.status(201).json({
            message:"Store was updated successfully",
            addedStore
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