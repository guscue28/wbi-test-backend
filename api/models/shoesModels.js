'use strict'
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ShoesSchema = new Schema({
  name: {
		type: String,
	},
  img: { 
		type: String,
	},
  price: {
		type: Number,
  },
  brand: {
		type: String,
  },
  model: {
		type: String
  },
  releaseAt: {
		type: String,
  },
  store: {
    type: Schema.Types.ObjectId,
    ref: 'stores'
  },
})

module.exports = mongoose.model('Shoes', ShoesSchema)
