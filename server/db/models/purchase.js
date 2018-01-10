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
  orderId: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  status: {
    type: Sequelize.STRING,
    defaultValue: 'processing'
  }
})

module.exports = Purchase
