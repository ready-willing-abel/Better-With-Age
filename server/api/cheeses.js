const router = require('express').Router()
const { Cheese } = require('../db/models')
module.exports = router

router.get('/', (req, res, next) => {
  Cheese.findAll()
    .then(cheeses => res.json(cheeses))
    .catch(next)
})

router.post('/', (req, res, next) => {
  Cheese.create(req.body)
    .then(cheese => res.json(cheese))
    .catch(next)
})

router.put('/:id', function (req, res, next) {
  Cheese.update(req.body, {
    where: {
      id: req.params.id
    }
  })
    .then(r => {
      res.sendStatus(201)
    })
    .catch(next)
})
