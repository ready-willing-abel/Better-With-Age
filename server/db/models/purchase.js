const Sequelize = require('sequelize')
const db = require('../db')

const Purchase = db.define('purchase', {
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  priceAtTimeOfSale: {
    type: Sequelize.FLOAT,
    allowNull: true
  },
  ordered: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  orderStatus:{
    type: Sequelize.STRING,
    defaultValue: null
  }
})

module.exports = Purchase

//CG
//order table -- purchased and notpurchased. 1 to many relationship between user and order.
//join table between that order and the products
//order_products --> their price should reflect the price at purchase.
