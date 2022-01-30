const server = require('./app.js')

const port = process.env.NODE_PORT

server.listen(port, () => {
  console.log(`Server listening port: ${port}`)
})
