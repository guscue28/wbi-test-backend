module.exports = (app) => {
  require('./shoesRouter')(app)
  require('./storesRouter')(app)
}