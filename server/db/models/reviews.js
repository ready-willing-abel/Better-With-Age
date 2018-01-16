const Sequelize = require('sequelize')
const db = require('../db')

const Review = db.define('review', {
  review: {
    type: Sequelize.TEXT,
    defaultValue: "",
    allowNull: true
  }
})

module.exports = Review