const router = require('express').Router()
const { Cart, User, Cheese } = require('../db/models')
module.exports = router

router.get('/:id', (req, res, next) => {
  Cart.findAll({
    where:{
      userId: req.params.id
    }
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

router.post('/', (req, res, next) => {
  Cart.create(Object.assign({},req.body))
    .then(row => res.json(row))
    .catch(next)
})

router.put('/:id', (req, res, next) => {
  let Cid = req.params.id.split(0,req.params.id.indexOf('|'))
  let Uid = req.params.id.split(req.params.id.indexOf('|')+1)
  if (req.body.quantity>0){
    Cart.update(req.body, {
      where: {
        userId: Uid,
        cheeseId: Cid
      }
    })
      .then(r => {
        res.sendStatus(201)
      })
      .catch(next)
  }
  else{
    Cart.delete({
      where: {
        userId: Uid,
        cheeseId: Cid
      }
    })
    .then(r => {
      res.sendStatus(201)
    })
    .catch(next)
  }
})
