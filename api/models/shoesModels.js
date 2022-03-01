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
	base64: {
		type: String
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
		type: Date,
		default: '',
  },
  store: {
		type: String,
  },
})

module.exports = mongoose.model('Shoes', ShoesSchema)
