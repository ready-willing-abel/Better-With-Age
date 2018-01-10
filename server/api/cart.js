const router = require('express').Router()
const { Cart, User, Cheese } = require('../db/models')
module.exports = router

router.get('/:id', (req, res, next) => {
  Cart.findAll({
    where:{
      userId: req.params.id
    },
    include: [
      {
        all: true
      }
    ]
  })
    .then(cart => res.json(cart))
    .catch(next)
})

router.delete('/:id', (req, res, next) => {
  Cart.detroy({
    where: {
      userId: req.params.id
    }
  })
    .then(cart => res.json(cart))
    .catch(next)
})

router.post('/:id', (req, res, next) => {
  Cart.create(Object.assign({},req.body,{userId:req.params.id}))
    .then(cart => res.json(cart))
    .catch(next)
})

router.put('/:id', (req, res, next) => {
  Cart.update(req.body, {
    where: {
      id: req.params.id
    }
  })
    .then(r => {
      res.sendStatus(201)
    })
    .catch(next)
})

router.get('/', (req, res, next) => {
  User.findAll({
    include: [
      {
        all: true
      }
    ]})
    .then(users => res.json(users))
    .catch(next)
})
