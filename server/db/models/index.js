const User = require('./user')
const Cart = require('./cart')
const Cheese = require('./cheese')
const Purchase = require('./purchase')

/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */

 Cart.hasMany(Cheese)
 Cart.belongsTo(User)
 User.hasMany(Purchase)
 Cheese.hasMany(Purchase)

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */
module.exports = {
  User,
  Cart,
  Purchase,
  Cheese
}
