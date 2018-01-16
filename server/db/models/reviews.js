const Sequelize = require('sequelize')
const db = require('../db')
const Cheese = require('./cheese')

const Review = db.define('review', {
  review: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  rating: {
    type: Sequelize.INTEGER,
    defaultValue: 5,
    allowNull: true,
    validate:{
      max: 5,                  
      min: 1
    }
  }
})

Review.afterCreate(function(review){
  return review.getCheese()
  .then(cheese => {
    return cheese.increment('totalReviews')
  })
  .then(cheese => {
    return cheese.reload();
  })
})

Review.afterCreate(function(review){
  return review.getCheese()
  .then(cheese => {
      return cheese.increment('totalRatingSum', {by:review.rating})
  })
  .then(cheese => {
    return cheese.reload();
  })
})

module.exports = Review