const router = require('express').Router()
const {User} = require('../db/models')
module.exports = router

router.get('/:id', (req, res, next) => {
  //only let a user look up his/herself
  User.findOne({
    where: {id: req.params.id},
  })
    .then(user => res.json(user))
    .catch(next)
})


router.put('/:id', function (req, res, next) {
  User.update(req.body, {
    where: {
      id: req.params.id
    }
  })
  .then(() => {
    res.sendStatus(201)})
  .catch(next)
})

router.post('/', (req, res, next) => {
  User.create(req.body)
    .then(user => res.json(user))
    .catch(next)
})

router.delete('/:id', (req, res, next) => {
  User.destroy({
    where: {id: req.params.id}
  })
    .then(r => res.sendStatus(201))
    .catch(next)
})


router.get('/', (req, res, next) => {
  User.findAll()
    .then(users => res.json(users))
    .catch(next)
})
