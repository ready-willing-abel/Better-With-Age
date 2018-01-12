const User = require('./user')
const Category = require('./categories')
const Cheese = require('./cheese')
const Purchase = require('./purchase')

/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */

 Purchase.belongsTo(User)
 Purchase.belongsTo(Cheese)
 Cheese.belongsTo(Category)

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */
module.exports = {
  User,
  Category,
  Cheese,
  Purchase
}
