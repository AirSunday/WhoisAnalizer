const mongoose = require('mongoose'),
     UserModel = require('@WhoisCheckerModels/user'),
     DomenModel = require('@WhoisCheckerModels/domen');
const models = {
  User: mongoose.model('User'),
  Domen: mongoose.model('Domen')
}
module.exports = models;
