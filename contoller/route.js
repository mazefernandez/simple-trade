// Handle the routing of store endpoints
const express = require("express")
const router = express.Router()

const { addStore } = require("../contoller/store")

router.route("/").post(addStore)

module.exports = router