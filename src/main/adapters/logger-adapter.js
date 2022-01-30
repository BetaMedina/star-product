
const winston = require('winston')

class LoggerConfig {
  constructor () {
    const addAppNameFormat = winston.format(info => {
      info.date = new Intl.DateTimeFormat('pt-br', { dateStyle: 'short', timeStyle: 'short' }).format(new Date().setUTCDate(''))
      return info
    })

    const logConfiguration = {
      transports: [
        new winston.transports.Console()
      ],
      format: winston.format.combine(
        addAppNameFormat(),
        winston.format.json()
      )
    }
    this.logger = winston.createLogger(logConfiguration)
  }

  logInfo ({ method = 'info', errorClass, stack, type, data, ...extra }) {
    this.logger[method]({ class: errorClass, stack, type, data, ...extra })
  }
}

exports.LoggerConfig = new LoggerConfig()
