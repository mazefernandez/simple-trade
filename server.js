const express = require('express') 
const connection = require('./db')

const app = express()
const PORT = 3000

connection()

app.use(express.json())

app.get('/', (req, res) => {
    res.send('Simpletrade Ventures Exam')
})

const server = app.listen(PORT, () => 
    console.log(`Server is connected to port ${PORT}`)
)

// Error handling 
process.on("unhandledRejection", err => {
    console.log(`Error occured: ${err.message}`)
    server.close(() => process.exit(1))
})