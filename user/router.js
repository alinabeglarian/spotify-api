const { Router } = require('express')
const User = require('./model')
const bcrypt = require('bcrypt')

const router = new Router()

router.post(
  '/users', 
  (req, res, next) => {

  const user = {
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 10),
    password_confirmation: bcrypt.hashSync(req.body.password_confirmation, 10)
  }

  if (req.body.password !== req.body.password_confirmation) {
    res.status(400).send({
      message: 'Passwords do not match'
    })
  } else {
    User
      .create(user)
      .then(() => res
        .status(201)
        .json({message: 'You have succesfully created an account!'}))
      .catch(err => next(err))
    }
})

module.exports = router

