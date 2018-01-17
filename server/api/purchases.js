const router = require('express').Router()
const { Purchase } = require('../db/models')
const { User } = require('../db/models')
const { Cheese } = require('../db/models')
module.exports = router

router.get('/user/history/:id', (req, res, next) => {
  if (req.params.id === 'UNAUTH') {
    Purchase.findAll({
      where: {
        id: req.session.cart,
        ordered: true
      },
      include: [
        { model: Cheese }
      ]
    })
    .then(purchases => res.json(purchases))
    .catch(next)
  }
  else{
    Purchase.findAll({
      where: {
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
  }
})

router.get('/user/cart/:id', (req, res, next) => {
  if (req.params.id === 'UNAUTH'){
    Purchase.findAll({
      where: {
        id: req.session.cart,
        ordered: false
      },
      include: [
        { model: Cheese }
      ]
    })
    .then(purchases => {
      res.json(purchases)
    })
    .catch(next)
  }
  else{
    let AllPurchases = []
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
    .then(purchases => {
      AllPurchases = AllPurchases.concat(purchases)
      Purchase.findAll({
        where: {
          id: req.session.cart,
          ordered: false
        },
        include: [
          { model: Cheese }
        ]
      })
        .then(morePurchases => {
          morePurchases.filter(v=>!AllPurchases.map(w=>w.id).includes(v.id))
          req.session.cart = []
          res.json(AllPurchases.concat(morePurchases))
        })
        .catch(next)
    })
    .catch(next)
  }
})

router.post('/', (req, res, next) => {
    Purchase.create(req.body)
    .then(purchase => {
      if(!req.body.userId){
        if (req.session.cart) req.session.cart.push(purchase.id)
        else req.session.cart = [purchase.id]
      }
      Purchase.findAll({
        where: {
          id: purchase.id
        },
        include: [
          { model: Cheese }
        ]
      })
        .then(rows => {
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

router.put('/:id', (req, res, next) => {
  if(req.body.ordered){
    Cheese.findAll({
      where:{
        id: req.body.cheeseId
      }
    })
    .then(cheese=>{
      Cheese.update({quantity: Math.max(cheese[0].quantity-req.body.quantity,0)},{
        where:{
          id: cheese[0].id
        }
      })
    })
  }
  if (req.body.quantity > req.body.cheeseQ) req.body.quantity = req.body.cheeseQ
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
