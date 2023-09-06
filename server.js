// Server 
const express = require('express') 
const cookieParser = require('cookie-parser')
const connection = require('./db')
const { adminAuth, userAuth } = require("./middleware/auth")

const app = express()
const PORT = 3000

connection()

// Middleware 
app.use(express.json())
app.use(cookieParser())
app.use("/api/auth", require("./auth/route"))

app.get('/', (req, res) => {
    res.send("Simpletrade Ventures Exam")
})

app.get('/admin', adminAuth, (req, res) => {mon
    res.send("Admin Route")
})

app.get('/basic', userAuth, (req, res) => {
    res.send("User Route")
})

const server = app.listen(PORT, () => 
    console.log(`Server is connected to port ${PORT}`)
)

// Error handling 
process.on("unhandledRejection", err => {
    console.log(`Error occurred: ${err.message}`)
    server.close(() => process.exit(1))
})