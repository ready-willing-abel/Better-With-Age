const router = require('express').Router()
const { Purchase } = require('../db/models')
const { User } = require('../db/models')
const { Cheese } = require('../db/models')
module.exports = router

// move 2 routes into User's routes

router.get('/user/history/:id', (req, res, next) => {
  Purchase.findAll({
    where:{
      userId: req.params.id,
      ordered: true
    },
    include: [
      { model: User },
      { model: Cheese }
    ]
  })
    .then(purchases => res.json(purchases))
    .catch(next)
})

router.get('/user/cart/:id', (req, res, next) => {
  console.log('entering route: ')
  Purchase.findAll({
    where: {
      userId: req.params.id,
      ordered: false
    },
    include: [
      { model: User },
      { model: Cheese }
    ]
  })
    .then(purchases =>{
      res.json(purchases)})
    .catch(next)
})

// posting purchase doesnt delete cart automatically

router.post('/', (req, res, next) => {
  Purchase.create(req.body)
    .then(purchase =>{
      Purchase.findAll({
        where:{
          id:purchase.id
        },
        include: [
          { model: User },
          { model: Cheese }
        ]
      })
      .then(rows=>{
        res.json(rows[0])
      })
    })
    .catch(next)
})

router.delete('/:id', (req, res, next) => {
  Purchase.destroy({
    where: { id: req.params.id }
  })
    .then(r => res.sendStatus(201))
    .catch(next)
})


// req.body in the following route must be very specifically formatted:
// {ordered: true, priceAtTimeOfSale: '$$', cheeseId, userId...}

router.put('/:id', (req, res, next) => {
  console.log('enetering route: ',req.body)
  Purchase.update(req.body, {
    where: {
      id: req.params.id
    }
  })
    .then(order => {
      res.json(order)
    })
    .catch(next)
})

router.get('/', (req, res, next) => {
  Purchase.findAll({
    include: [
      { model: User },
      { model: Cheese }
    ]
  })
    .then(purchases => res.json(purchases))
    .catch(next)
})
