const express = require('express'),
  app = express(),
  compression = require('compression'),
  cookieParser = require('cookie-parser'),
  cors = require('cors'),
  routes = require('./routes'),
  config = require('./config').getProperties(),
  appLogger = require('pino')({
    level: config.logLevel
  }),
  axios = require('axios')

appLogger.warn('Set unique user agent')
axios.defaults.headers['User-Agent'] = 'template-express'
global.appLogger = appLogger
app.use(compression())
app.set('view engine', 'pug')

app.use(express.json())
app.use(express.urlencoded({ json: true, extended: true }))
app.use(cookieParser())
app.use(cors())
app.disable('x-powered-by')

app.get('/*', (req, res, next) => {
  appLogger.info({ url: req.originalUrl }, 'Requested URL')
  next()
})

app.use(routes)
// Route handlers
app.use(express.static('build'))

// Start server
const server = app.listen(config.port, function () {
  appLogger.warn('Please check with infrastructure team to ensure the port is unique.')
  appLogger.info(
    {
      port: server.address().port,
      environment: process.env.NODE_ENV
    },
    `App started in ${process.env.NODE_ENV || 'local'} mode.`
  )
})
