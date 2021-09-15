require('dotenv').config()

const express = require('express')
const dbConfig = require('./db')
const app = express()

const port = process.env.PORT || 5000
app.listen(port, () => console.log(`server is running on port ${port}`))
