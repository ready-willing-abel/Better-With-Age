const Sequelize = require('sequelize')
const db = require('../db')

const Purchase = db.define('purchase', {
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  priceAtTimeOfSale: {
    type: Sequelize.FLOAT,
    allowNull: false
  },
  ordered: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  }
})

module.exports = Purchase
