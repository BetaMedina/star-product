const express = require('express')
const routeLoader = require('./config/loader-routes.js')
const compression = require('compression')
const { cors } = require('./middlewares/cors')

require('dotenv').config()

const app = express()
app.use(compression())
app.use(cors)
app.disable('x-powered-by')
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
routeLoader(app)

module.exports = app
