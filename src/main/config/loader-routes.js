/* eslint-disable node/no-path-concat */
const { Router } = require('express')
const { readdirSync } = require('fs')
const { loggerMiddleware } = require('../middlewares/logger-middleware')
module.exports = (app) => {
  const router = Router()

  app.use('/api', router)

  router.use(loggerMiddleware())
  readdirSync(`${__dirname}/../routes`).map(async file => {
    if (file.endsWith('.routes.js')) {
      (await import(`file:///${__dirname}/../routes/${file}`)).default(router)
    }
  })

  app.post('*', (req, res) => res.status(501).json())
  app.get('*', (req, res) => res.status(501).json())
  app.put('*', (req, res) => res.status(501).json())
  app.delete('*', (req, res) => res.status(501).json())

}
