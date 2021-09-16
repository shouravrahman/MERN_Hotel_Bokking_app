require('dotenv').config()

const express = require('express')
const dbConfig = require('./db')
const roomsRoute = require('./routes/roomsRoute')
const app = express()

app.use('/api/rooms', roomsRoute)

const port = process.env.PORT || 5000
app.listen(port, () => console.log(`server is running on port ${port}`))
