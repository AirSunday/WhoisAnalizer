const mongoose = require('mongoose'),
      bcrypt = require('bcrypt');

const Schema = mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
})

mongoose.model('Domen', Schema);