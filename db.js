// Set up connection to the database 

const mongoose = require("mongoose")
const localDB = `mongodb://localhost:27017/role_auth`

const connection = async () => {
  await mongoose.connect(localDB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  console.log("MongoDB Connected")
}

// Allow other files to use mongoDB connection
module.exports = connection