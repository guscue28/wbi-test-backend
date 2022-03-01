'use strict'
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ShoesSchema = new Schema({
  name: {
		type: String,
	},
  pictures: [{ 
		img: String,
		principal: Boolean
	}],
	base64: {
		type: String
  },
  price: {
		type: Number,
  },
  brand: {
		type: Schema.Types.ObjectId,
		ref: 'Brands',
  },
  model: {
		type: Schema.Types.ObjectId,
		ref: 'Model',
  },
  releaseAt: {
		type: Date,
		default: '',
  },
  store: {
		type: Schema.Types.ObjectId,
		ref: 'Stores',
  },
})

module.exports = mongoose.model('Shoes', ShoesSchema)
