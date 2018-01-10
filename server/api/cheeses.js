const router = require('express').Router()
const { Cheese } = require('../db/models')
module.exports = router

router.get('/R', (req, res, next) => {
  Cheese.findAll()
    .then(cheeses => {
      let c = []
      let i = 1
      while(c.length<6){
        if(Math.random>.15){
          c.push(cheeses[i%cheeses.length])
        }
        i++
      }
      res.json(c)
    })
    .catch(next)
})

router.get('/:id', (req, res, next) => {
  Cheese.findOne({
    where:{
      id: req.params.id
    }
  })
    .then(cheeses => res.json(cheeses))
    .catch(next)
})

router.get('/', (req, res, next) => {
  Cheese.findAll()
    .then(cheeses => res.json(cheeses))
    .catch(next)
})
