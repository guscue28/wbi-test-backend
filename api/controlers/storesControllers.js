'use strict'
const mongoose = require('mongoose')
const Stores = mongoose.model('Stores');

exports.listAll = async (req, res) => {
  try {
    const stores = await Stores.find()
    res.status(200).json(stores)
  } catch (err) {
    res.status(400).json({
      message: 'An error has ocurred',
      error: err.response
    })
  }
}