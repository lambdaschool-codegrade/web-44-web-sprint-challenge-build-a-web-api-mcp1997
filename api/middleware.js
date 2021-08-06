function logger(req, res, next) {
  console.log('req flowing through the app')
  req.test = 'test'
  next()
}

module.exports = { logger }