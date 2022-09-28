const mongoose = require('mongoose');
const boom = require('boom')
const whois = require('whois')

const api = {};

api.getInfoDomen = () => (req, res) => {  
    whois.lookup(req.body.name, function(err, data) {
        res.status(201).json(data)
    })
}
  
module.exports = api;