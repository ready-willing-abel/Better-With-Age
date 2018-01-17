const router = require('express').Router()
const {Review, User} = require('../db/models')
module.exports = router



router.get('/:id', (req, res, next) => {
  //only let a user look up his/herself
  Review.findById({
    where:{
      id: req.params.id
    }
  })
    .then(review => res.json(review))
    .catch(next)
})

router.get('/', (req, res, next) => {
  //only let a user look up his/herself
  Review.findAll({
    include:[{model:User}]
  })
    .then(review => res.json(review))
    .catch(next)
})

router.post('/',(req, res, next) => {
  Review.create(req.body)
    .then(review => res.json(review))
    .catch(next)
})

router.put('/:id', (req, res, next) => {
  Review.update(req.body, {
    where:{
      id: req.params.id
    }
  })
  .then(result => {
    res.sendStatus(201)
  })
  .catch(next)
})

router.delete('/:id', (req, res, next) => {
  Review.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(review => res.json(review))
  .catch(next)
})

