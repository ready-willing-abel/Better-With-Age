const Sequelize = require('sequelize')
const db = require('../db')
const Review = require('./reviews')

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
  quantity: {
    type: Sequelize.INTEGER,
  },
  imageUrl: {
    type: Sequelize.STRING,
    defaultValue: "https://woodys-smokehouse.com/wp-content/uploads/2014/06/sa_cheese_festival_give_small_cheese_makers_an_economic_boost_link.jpg"
  },
  description: {
    type: Sequelize.TEXT,
    defaultValue: "",
    allowNull: true
  },
  totalReviews: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
  },
  totalRatingSum: {
    type: Sequelize.FLOAT,
    defaultValue:0
  }
})


module.exports = Cheese