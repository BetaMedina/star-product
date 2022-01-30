exports.cors = (req, res, next) => {
  res.set('access-control-allow-origin', '*')
  res.set('access-control-allow-methods', 'GET,POST,PUT,DELETE')
  res.set('access-control-allow-headers', '*')

  next()
}
