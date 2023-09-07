// Handle the routing of store endpoints
const express = require("express")
const router = express.Router()

const { addStore, updateStore, deleteStore, getStore, getStores, getUserStores } = require("../contoller/store")
const { adminAuth, userAuth } = require("./../middleware/auth")

router.route("/").get(getStore)
router.route("/").post(addStore)
router.route("/").put(updateStore)
router.route("/").delete(deleteStore)

router.route("/getAll").get(adminAuth, getStores)
router.route("/getUserStores").get(userAuth, getUserStores)

module.exports = router