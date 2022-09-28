const mongoose = require('mongoose');
const boom = require('boom')

const api = {};

api.get = (Domen) => (req, res) => {
    const item = Domen.findById(req.body._id)
    if (!item) res.status(401).send({ success: false, message: 'Domen not found.' });
    else {
        res.json({ success: true, message: 'Domen created successfully' });
    };
}

 api.getAll = (Domen) => async (req, res) => {
    try {
        const item = await Domen.find()
        res.json(item)
    } catch (error) {
        throw boom.boomify(error)
    }
}

api.create = (Domen) => (req, res) => {
    if (!req.body.name) res.json({ success: false, message: 'error domen name' });
    else {
      const newDomen = new Domen({
        name: req.body.name,
        });
      newDomen.save((error) => {
        if (error) return res.status(400).json({ success: false, message:  'Error save domen' });
        res.json({ success: true, message: 'Domen created successfully' });
      })
    }
}

api.delete = (Domen) => (req, res) => {
    try {
        model.findByIdAndDelete(req.params.id)
        res.status(200).send({status: 'OK', messag: 'Delete domenname'})
    } catch (error) {
        throw boom.boomify(error)
    }
}
  
api.update = (Domen) => ({ body }, res) => {
    try {
        const item =  model.findByIdAndUpdate(req.params.id, body, { new: true })
        res.status(200).send(item)
      } catch (err) {
          throw boom.boomify(error)
      }
}
  
module.exports = api;