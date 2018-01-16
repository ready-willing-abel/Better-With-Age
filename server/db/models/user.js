const crypto = require('crypto')
const Sequelize = require('sequelize')
const db = require('../db')

const User = db.define('user', {
  //CG: we can go nameless?
  //notEmpty validation on string is helpful
  name:{
    type: Sequelize.STRING
  },
  email: {
    type: Sequelize.STRING,
    unique: true
    //may want isEmail validations.
  },
  password: {
    type: Sequelize.STRING
  },
  salt: {
    type: Sequelize.STRING
  },
  googleId: {
    type: Sequelize.STRING
  },
  //dont need this
  loggedIn:{
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  isAdmin:{
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
})

module.exports = User

/**
 * instanceMethods
 */
User.prototype.correctPassword = function (candidatePwd) {
  return User.encryptPassword(candidatePwd, this.salt) === this.password
}

/**
 * classMethods
 */
User.generateSalt = function () {
  return crypto.randomBytes(16).toString('base64')
}

User.encryptPassword = function (plainText, salt) {
  return crypto
    .createHash('RSA-SHA256')
    .update(plainText)
    .update(salt)
    .digest('hex')
}

/**
 * hooks
 */
const setSaltAndPassword = user => {
  if (user.changed('password')) {
    user.salt = User.generateSalt()
    user.password = User.encryptPassword(user.password, user.salt)
  }
}

User.beforeCreate(setSaltAndPassword)
User.beforeUpdate(setSaltAndPassword)
