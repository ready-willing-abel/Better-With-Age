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
    Cheese.create({name:'Gouda', category:'', price: '50', quantity:40, imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6vdx44qC8cQC5fhleMVvZNh8Qwyiji4AMzgI6UxnE1s1RZpm1"}),
    Cheese.create({name:'Cheddar', category:'', price: '21', quantity:20, imageUrl:"https://bigoven-res.cloudinary.com/image/upload/c_fill,h_300,w_300/cheddar-cheese.jpg"}),
    Cheese.create({name:'Brie', category:'', price: '14', quantity:15, imageUrl:"https://www.gourmetfoodstore.com/images/Product/large/mon-sire-brie-mon-sire-1S-2627.jpg"}),
    Cheese.create({name:'Mozzarella', category:'', price: '61', quantity:30, imageUrl:"https://atmedia.imgix.net/d3b9fbfb7d8a295b7a4c405ac926347d8aad7bf1?auto=format&q=45&w=540.0&h=540.0&fit=max&cs=strip"}),
    Cheese.create({name:'Gruyere', category:'', price: '45', quantity:50, imageUrl:"http://www.cheesesfromswitzerland.com/fileadmin/_processed_/csm_content_gruyere_70deb08889.jpg"}),
    Cheese.create({name:'Manchego', category:'', price: '50', quantity:100, imageUrl:"http://mandalindeli.co.uk/wp-content/uploads/2016/12/manchego-cheese.jpg"}),
    Cheese.create({name:'Camembert', category:'', price: '21', quantity:90, imageUrl:"https://www.andrewjamesworldwide.com/images/andrew-james-rustic-french-style-camembert-baker-p360-7813_image.jpg"}),
    Cheese.create({name:'Cotija', category:'', price: '14', quantity:70, imageUrl:"http://files.wisconsincheesetalk.com/wp-content/uploads/2015/05/cotija-crumbles.jpg"}),
    Cheese.create({name:'Feta', category:'', price: '4', quantity:80, imageUrl:"http://www.cheesemaking.com/Shared/Images/Product/Feta-Cheese-Recipe/Feta_hero.jpg"}),
    Cheese.create({name:'Muenster', category:'', price: '12', quantity:75, imageUrl:"http://pixel.nymag.com/imgs/daily/grub/2013/04/01/01-muenster-cheese.w710.h473.2x.jpg"}),
    Cheese.create({name:'Burrata', category:'', price: '8', quantity:100, imageUrl:"https://images-na.ssl-images-amazon.com/images/I/51B1vs3%2BavL._SY355_.jpg"}),
    Cheese.create({name:'Swiss', category:'', price: '5', quantity:90, imageUrl:"https://az616578.vo.msecnd.net/files/2017/01/15/636200553336849231725159057_Dollarphotoclub_53674521.jpg"}),
    Cheese.create({name:'Comte', category:'', price: '13', quantity:70, imageUrl:"https://theflexitarian.co.uk/wp-content/uploads/2015/10/Comte-800.jpg"}),
    Cheese.create({name:'Butterkase', category:'', price: '11', quantity:80, imageUrl:"https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/DeutschButterk%C3%A4se.jpg/1200px-DeutschButterk%C3%A4se.jpg"}),
    Cheese.create({name:'Oaxaca', category:'', price: '7', quantity:75, imageUrl:"https://sep.yimg.com/ca/I/mex-grocer_2268_135897090"})
  ])

  console.log(`seeded ${cheeses.length} cheeses`)

  const purchases = await Promise.all([
    Purchase.create({quantity:3, ordered: false, userId: 3, cheeseId:5}),
    Purchase.create({quantity:7, ordered: false, userId: 2, cheeseId:1}),
    Purchase.create({quantity:2, ordered:false, userId: 7, cheeseId:3}),
    Purchase.create({quantity:6, ordered: false, userId: 5, cheeseId:2}),
    Purchase.create({quantity:4, ordered: false, userId: 1, cheeseId:4}),
    Purchase.create({quantity:3, ordered: false, userId: 1, cheeseId:5}),
    Purchase.create({quantity:7, ordered: false, userId: 2, cheeseId:1}),
    Purchase.create({quantity:2, ordered: false, userId: 3, cheeseId:3}),
    Purchase.create({quantity:6, ordered: false, userId: 8, cheeseId:7}),
    Purchase.create({quantity:4, ordered: false, userId: 9, cheeseId:9}),
    Purchase.create({quantity:3, ordered: false, userId: 10, cheeseId:10}),
    Purchase.create({quantity:7, ordered: false, userId: 6, cheeseId:15}),
    Purchase.create({quantity:2, ordered: false, userId: 10, cheeseId:12}),
    Purchase.create({quantity:6, ordered: false, userId: 13, cheeseId:4}),
    Purchase.create({quantity:4, ordered: false, userId: 12, cheeseId:8})
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
