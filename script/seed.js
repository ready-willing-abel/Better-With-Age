const db = require('../server/db')
const { User, Category, Cheese, Purchase } = require('../server/db/models')
// const chalk = require('chalk')
// const chance = require('chance').Chance()
// const Promise = require('bluebird')

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
    User.create({name:'Bob Moses', email: 'bob@email.com', password: '123', isAdmin:true}),
    User.create({name:'Christian Nodal', email: 'christian@email.com', password: '123', isAdmin:true}),
    User.create({name:'Frank Ocean', email: 'frank@email.com', password: '123'}),
    User.create({name:'Tyler Creator', email: 'tyler@email.com', password: '123'}),
    User.create({name:'Drake Drake', email: 'drake@email.com', password: '123', isAdmin:true}),
    User.create({name:'Local Natives', email: 'local@email.com', password: '123'}),
    User.create({name:'James Blake', email: 'james@email.com', password: '123'}),
    User.create({name:'Vince Staples', email: 'vince@email.com', password: '123'}),
    User.create({name:'Monte Booker', email: 'monte@email.com', password: '123', isAdmin:true})
  ])

  console.log(`seeded ${users.length} users`)


  const cheeses = await Promise.all([
    Cheese.create({name:'Gouda', category:'', price: '50', quantity:40}),
    Cheese.create({name:'Cheddar', category:'', price: '21', quantity:20}),
    Cheese.create({name:'Brie', category:'', price: '14', quantity:15}),
    Cheese.create({name:'Mozzarella', category:'', price: '61', quantity:30}),
    Cheese.create({name:'Gruyere', category:'', price: '45', quantity:50}),
    Cheese.create({name:'Manchego', category:'', price: '50', quantity:100}),
    Cheese.create({name:'Cemembert', category:'', price: '21', quantity:90}),
    Cheese.create({name:'Cotija', category:'', price: '14', quantity:70}),
    Cheese.create({name:'Feta', category:'', price: '4', quantity:80}),
    Cheese.create({name:'Muenster', category:'', price: '12', quantity:75}),
    Cheese.create({name:'Burrata', category:'', price: '8', quantity:100}),
    Cheese.create({name:'Swiss', category:'', price: '5', quantity:90}),
    Cheese.create({name:'Comte', category:'', price: '13', quantity:70}),
    Cheese.create({name:'Butterkase', category:'', price: '11', quantity:80}),
    Cheese.create({name:'Oaxaca', category:'', price: '7', quantity:75})
  ])

  console.log(`seeded ${cheeses.length} cheeses`)

  const purchases = await Promise.all([
    Purchase.create({quantity:3, priceAtTimeOfSale:5, ordered: true, userId: 3, cheeseId:5}),
    Purchase.create({quantity:7, priceAtTimeOfSale:5, ordered: false, userId: 2, cheeseId:1}),
    Purchase.create({quantity:2, priceAtTimeOfSale:10, ordered: true, userId: 7, cheeseId:3}),
    Purchase.create({quantity:6, priceAtTimeOfSale:5, ordered: false, userId: 5, cheeseId:2}),
    Purchase.create({quantity:4, priceAtTimeOfSale:10, ordered: true, userId: 1, cheeseId:4}),
    Purchase.create({quantity:3, priceAtTimeOfSale:5, ordered: true, userId: 1, cheeseId:5}),
    Purchase.create({quantity:7, priceAtTimeOfSale:3, ordered: false, userId: 2, cheeseId:1}),
    Purchase.create({quantity:2, priceAtTimeOfSale:5, ordered: true, userId: 3, cheeseId:3}),
    Purchase.create({quantity:6, priceAtTimeOfSale:5, ordered: false, userId: 8, cheeseId:7}),
    Purchase.create({quantity:4, priceAtTimeOfSale:3, ordered: true, userId: 9, cheeseId:9}),
    Purchase.create({quantity:3, priceAtTimeOfSale:5, ordered: true, userId: 10, cheeseId:10}),
    Purchase.create({quantity:7, priceAtTimeOfSale:3, ordered: false, userId: 6, cheeseId:15}),
    Purchase.create({quantity:2, priceAtTimeOfSale:3, ordered: true, userId: 10, cheeseId:12}),
    Purchase.create({quantity:6, priceAtTimeOfSale:5, ordered: false, userId: 13, cheeseId:4}),
    Purchase.create({quantity:4, priceAtTimeOfSale:5, ordered: true, userId: 12, cheeseId:8})
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
