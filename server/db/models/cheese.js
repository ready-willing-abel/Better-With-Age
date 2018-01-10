const Sequelize = require('sequelize')
const db = require('../db')

const Cheese = db.define('cheese', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
<<<<<<< HEAD
  type: {
    //cg: should be a string.
    //maybe define this in the association as an as
    //you are getting into some complexity. 
    //rename category.
    type: Sequelize.INTEGER,
=======
  category: {
    type: Sequelize.STRING,
>>>>>>> 459fd4a9be5b538d02bbd3903d852e9ba1db34e3
    allowNull: false
  },
  price: {
    type: Sequelize.INTEGER
  },
  quantity:{
    type: Sequelize.INTEGER,
  }
  //need quantity of cheeses. 
  
  //can cheese cost $-5 
  //maybe some more validations
  //perhaps integer.
})

module.exports = Cheese
