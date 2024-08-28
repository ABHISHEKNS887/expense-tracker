const convict = require('convict')
convict.addFormat(require('convict-format-with-validator').url)

let config = convict({
  environment: {
    doc: 'Application environment',
    format: ['production', 'development'],
    default: 'development',
    env: 'NODE_ENV',
    arg: 'environment'
  },
  port: {
    doc: 'Port in which application should run',
    format: 'port',
    default: 6004,
    arg: 'port'
  },
  region: {
    doc: 'Region in which the application is being run',
    format: 'String',
    default: 'in',
    env: 'REGION',
    arg: 'region'
  },
  logLevel: {
    doc: 'Debug level configuration',
    format: 'String',
    default: 'info',
    arg: 'logLevel'
  }
})

config.validate({ allowed: 'strict' })

module.exports = config
