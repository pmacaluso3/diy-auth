const express = require('express')
const app = express()

const morgan = require('morgan')
const logger = morgan('dev')
app.use(logger)
const rowdy = require('rowdy-logger').begin(app)

app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(require('cookie-parser')())

app.use(express.static('public'))

// app.get('/', (req, res) => {
//   res.send('ok')
// })

// app.get('/set', (req, res) => {
//   res.cookie('bing', 'bang')
//   res.send('set')
// })

// app.get('/unset', (req, res) => {
//   res.clearCookie('bing')
//   res.send('unset')
// })

// app.get('/get', (req, res) => {
//   res.send(req.cookies)
// })

app.use('/users', require('./controllers/usersController'))

app.listen(3000, () => {
  rowdy.print()
})
