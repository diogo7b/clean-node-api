const Exppress = require('express')
const setupApp = require('./setup')
const setupRoutes = require('./routes')

const app = Exppress()

setupApp(app)
setupRoutes(app)

module.exports = app
