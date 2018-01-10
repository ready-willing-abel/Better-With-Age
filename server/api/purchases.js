const router = require('express').Router()
const { Purchase } = require('../db/models')
module.exports = router

router.get('/:id', (req, res, next) => {
  Purchase.findAll({
    where:{
      userId: req.params.id
    }
  })
    .then(purchases => res.json(purchases))
    .catch(next)
})

router.get('/', (req, res, next) => {
  Purchase.findAll()
    .then(purchases => res.json(purchases))
    .catch(next)
})

// posting purchase doesnt delete cart automatically

router.post('/', (req, res, next) => {
  Purchase.create(req.body)
    .then(purchases => res.json(purchases))
    .catch(next)
})

router.put('/:id', (req, res, next) => {
  Purchase.update(req.body, {
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
  Purchase.findAll()
    .then(purchases => res.json(purchases))
    .catch(next)
})
