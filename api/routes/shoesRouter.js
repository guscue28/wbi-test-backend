const cors = require('cors')

module.exports = function (app) {
  const shoes = require('../controlers/shoesControllers')

  //Traer todos los zapatos
  app.route('/shoes/all').get(cors(), shoes.listAll)
  //Crear un nuevo zapato
  app.route('/shoes/new-shoe').post(cors(), shoes.newShoe)
}