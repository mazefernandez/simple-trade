const express = require('express') 

const app = express()
const PORT = 3000

app.get('/', (req, res) => {
    res.send('Simpletrade Ventures Exam')
})

app.listen(PORT, () => 
    console.log(`Server is connected to port ${PORT}`)
)