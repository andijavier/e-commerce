if (process.env.NODE_ENV !== "production") {
    require('dotenv').config()
}
const express = require('express')
const app = express()
const cors = require('cors')
const router = require('./routes')
const errHandler = require('./middlewares/errHandler')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/', router)
app.use(errHandler)


module.exports = app