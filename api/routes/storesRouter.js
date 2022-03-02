const cors = require('cors')

module.exports = function (app) {
  const stores = require('../controlers/storesControllers')

  // Traer todas las tiendas
  app.route('/stores/all').get(cors(), stores.listAll)
}