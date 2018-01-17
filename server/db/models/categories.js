const Sequelize = require('sequelize')
const db = require('../db')

const Category = db.define('categoryName', {
  CategoryName: {
    type: Sequelize.STRING,
    allowNull: false
  }
})

module.exports = Category
