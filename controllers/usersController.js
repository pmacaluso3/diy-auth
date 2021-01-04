const router = require('express').Router()
const bcrypt = require('bcrypt')

const models = require('../models')

router.post('/', async (req, res) => {
  const salt = bcrypt.genSaltSync(10)
  const hashedPassword = bcrypt.hashSync(req.body.password, salt)
  
  let user
  try {
    user = await models.User.create({
      email: req.body.email,
      hashedPassword
    })

    res.cookie('userId', user._id)
    res.send(user)
  } catch (error) {
    res.send(error)
  }
})

router.post('/login', async (req, res) => {
  const user = await models.User.findOne({
    email: req.body.email
  })

  if (!user) {
    res.status(404).send('User not found')
    return
  }

  const pwResult = bcrypt.compareSync(req.body.password, user.hashedPassword)

  if (pwResult) {
    res.cookie('userId', user._id)
    res.json(user)
  } else {
    res.status(403).send('Forbidden')
  }
})

router.delete('/logout', (req, res) => {
  res.clearCookie('userId')
  res.send('ok')
})

router.get('/profile', async (req, res) => {
  if (!req.cookies.userId) {
    res.status(403).send('Must be logged in')
    return
  }
  
  const user = await models.User.findOne({
    _id: req.cookies.userId
  })

  if (user) {
    res.json(user)
  } else {
    res.status(404).send('User not found')
  }
})

module.exports = router