const Sequelize = require('sequelize')
const db = require('../db')

const Cheese = db.define('cheese', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  type: {
    //cg: should be a string.
    //maybe define this in the association as an as
    //you are getting into some complexity. 
    //rename category.
    type: Sequelize.INTEGER,
    allowNull: false
  },
  tags: {
    type: Sequelize.ARRAY(Sequelize.STRING),
  },
  price: {
    type: Sequelize.FLOAT
  }
  //need quantity of cheeses. 
  
  //can cheese cost $-5 
  //maybe some more validations
  //perhaps integer.
})

module.exports = Cheese
