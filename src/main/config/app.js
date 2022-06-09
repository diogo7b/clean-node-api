const Exppress = require('express')
const setupApp = require('./setup')

const app = Exppress()

setupApp(app)

module.exports = app
