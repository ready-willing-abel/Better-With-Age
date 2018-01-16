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

// Review.afterCreate(function(review){
//   let id = review.cheeseId

//   return review.getCheese({
//     where:{
//       id: id
//     }
//   })
//   .then(review => {
//     console.log(review)
//   })
//   .then(cheese => {
//     // if(cheese.id === review.cheeseId){
//       cheese.totalRatings++;
//     // }
//     // console.log(cheese.totalRatings);
//   })
// })

module.exports = Review