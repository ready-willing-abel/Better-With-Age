const Sequelize = require('sequelize')
const db = require('../db')

const Cheese = db.define('cheese', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  category: {
    type: Sequelize.STRING,
    allowNull: false
  },
  price: {
    type: Sequelize.INTEGER
  },
  quantity:{
    type: Sequelize.INTEGER,
  }
})

module.exports = Cheese
