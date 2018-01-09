const Sequelize = require('sequelize')
const db = require('../db')

const Cheese = db.define('cheese', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  type: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  tags: {
    type: Sequelize.ARRAY(Sequelize.STRING),
  },
  price: {
    type: Sequelize.FLOAT
  }
})

module.exports = Cheese
