'use strict'
const mongoose = require('mongoose')
const Shoes = mongoose.model('Shoes');

exports.listAll = async (req, res) => {
  const itemsPerPage = parseInt(req.query.itemsPerPage)
  const page = parseInt(req.query.page)
  const searchKey = req.query.searchKey
  const store = req.query.store
  const releaseAt = req.query.releaseAt
  let query = {}
  if (searchKey || store || releaseAt) {
    query = {
      $and: []
    }
    if (searchKey) {
      query.$and.push({
        $or: [
          { $expr: { $regexMatch: { input: { $toString: '$name' }, regex: searchKey, options: 'i' } } },
          { $expr: { $regexMatch: { input: { $toString: '$brand' }, regex: searchKey, options: 'i' } } },
          { $expr: { $regexMatch: { input: { $toString: '$model' }, regex: searchKey, options: 'i' } } },
        ],
      })
    }
    if (store && store !== '') {
      query.$and.push({store: store})
    }
    if (releaseAt && releaseAt !== '') {
      query.$and.push({releaseYear: releaseAt})
    }
  }
  try {
    const shoes = await Shoes.find(query).populate('store').limit(itemsPerPage).skip(itemsPerPage * page)
    const count = await Shoes.countDocuments(query)
    res.status(200).json({shoes, count})
  } catch (err) {
    console.log(err);
    res.status(400).json({
      message: 'An error has ocurred',
      error: err
    })
  }
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
  const shoe = new Shoes({
    name: req.body.name,
    img: req.body.img,
    price: req.body.price,
    brand: req.body.brand,
    model: req.body.model,
    releaseAt: req.body.releaseAt,
    store: req.body.store
  })

  shoe.save().then((result) => {
    res.status(201).json({
      message: 'Products saved successfuly.',
      shoe: result,
     })
  }).catch((err) => {
    res.status(400).json({
      message: 'Failed to save.',
      error: err.message,
    })
  })
}