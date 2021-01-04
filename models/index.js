const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/diyAuth')

module.exports = {
  User: require('./User')
}
