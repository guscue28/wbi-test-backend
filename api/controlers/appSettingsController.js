'use strict'
const mongoose = require('mongoose')
const Stores = mongoose.model('Stores');
const Shoes = mongoose.model('Shoes');
const migrations = require('../../utils/migrations')

exports.migrateData = async (req, res) => {
  try {
    const stores = await Stores.countDocuments()
    if (!stores > 0) {
      await Stores.insertMany(migrations.stores);
    }
    const shoes = await Shoes.countDocuments()
    if (!shoes > 0) {
      const allstores = await Stores.find().lean()
      migrations.shoes.map((shoe) => {
        const store = allstores.find((store) => store.name === shoe.store);
        shoe.store = store._id
        const newShoe = new Shoes(shoe)
        newShoe.save();
      })
    }
  } catch (err) {
    console.log(err);
  }
}