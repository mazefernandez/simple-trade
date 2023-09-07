// Handle the routing of store endpoints
const express = require("express")
const router = express.Router()

const { addStore, updateStore } = require("../contoller/store")

router.route("/").post(addStore)
router.route("/").put(updateStore)

module.exports = router