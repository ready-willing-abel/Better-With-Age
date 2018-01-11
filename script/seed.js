const db = require('../server/db')
const { User, Category, Cheese, Purchase } = require('../server/db/models')
const chalk = require('chalk')
const chance = require('chance').Chance()
const Promise = require('bluebird')

async function seed () {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all([
    User.create({name:'Big Sean', email: 'cody@email.com', password: '123', isAdmin:true}),
    User.create({name:'Murphy Lee', email: 'murphy@email.com', password: '123'}),
    User.create({name:'Eetai Magic', email: 'eetai@email.com', password: '123'}),
    User.create({name:'Robin Cello', email: 'robin@email.com', password: '123', isAdmin:true}),
    User.create({name:'Abel Cheese', email: 'abel@email.com', password: '123'}),
    User.create({name:'Vanessa Coffee', email: 'vanessa@email.com', password: '123'}),
    User.create({name:'Jacques Greene', email: 'jacque@email.com', password: '123'}),
    User.create({name:'Bob Moses', email: 'bob@email.com', password: '123', isAdmin:true})
  ])

  console.log(`seeded ${users.length} users`)


  const cheeses = await Promise.all([
    Cheese.create({name:'Gouda', category:'', price: '50', quantity:40}),
    Cheese.create({name:'Cheddar', category:'', price: '21', quantity:20}),
    Cheese.create({name:'Brie', category:'', price: '14', quantity:15}),
    Cheese.create({name:'Mozzarella', category:'', price: '61', quantity:30}),
    Cheese.create({name:'Gruyere', category:'', price: '45', quantity:50})
  ])

  console.log(`seeded ${cheeses.length} cheeses`)

  const purchases = await Promise.all([
    Purchase.create({quantity:3, priceAtTimeOfSale:40, ordered: true, userId: 3, cheeseId:5}),
    Purchase.create({quantity:7, priceAtTimeOfSale:40, ordered: false, userId: 2, cheeseId:1}),
    Purchase.create({quantity:2, priceAtTimeOfSale:40, ordered: true, userId: 7, cheeseId:3}),
    Purchase.create({quantity:6, priceAtTimeOfSale:40, ordered: false, userId: 5, cheeseId:2}),
    Purchase.create({quantity:4, priceAtTimeOfSale:40, ordered: true, userId: 1, cheeseId:4})
  ])

  console.log(`seeded ${purchases.length} purchases`)



  console.log(`seeded successfully`)


}


seed()
  .catch(err => {
    console.error(err.message)
    console.error(err.stack)
    process.exitCode = 1
  })
  .then(() => {
    console.log('closing db connection')
    db.close()
    console.log('db connection closed')
  })

/*
 * note: everything outside of the async function is totally synchronous
 * The console.log below will occur before any of the logs that occur inside
 * of the async function
 */
console.log('seeding...')
