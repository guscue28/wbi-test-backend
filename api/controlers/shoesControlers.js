'use strict'
const mongoose = require('mongoose')
const Shoes = mongoose.model('Shoes');

exports.listAll = (req, res) => {
  Shoes.find((error, shoes) => {
    error && res.status(500).send(error.message);
    res.status(200).json(shoes)
  })
}

// exports.findById = (req, res) => {
//   Shoes.findById(req.params.id, (error, shoes) => {
//     error && res.status(500).send(error.message);
//     res.status(200).json(shoes)
//   })
// }

exports.imageToBase64 = async (file) => {
	const base64 = await sharp(file && file.data ? file.data : file)
		.jpeg({ quality: 25 })
		.resize({ width: 27 })
		.toBuffer()
	return `data:image/png;base64,${base64.toString('base64')}`
}

exports.newShoe = (req, res) => {
  let shoe = new Shoes({
    name: req.body.name,
    img: req.body.name,
    price: req.body.price,
    brand: req.body.brand,
    model: req.body.model,
    releaseAt: req.body.releaseAt,
    store: req.body.store
  })

  shoe.save((error, addShoe) => {
    error && res.status(500).send(error.mensage);
    res.status(200).json(addShoe)
  })
}