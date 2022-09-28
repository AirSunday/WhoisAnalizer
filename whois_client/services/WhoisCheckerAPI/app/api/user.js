const mongoose = require('mongoose');

const api = {};

  api.signup = (User) => (req, res) => {
    if (!req.body.username || !req.body.password) res.json({ success: false, message: 'Please, pass a username and password.' });
    else {
      const newUser = new User({
        username: req.body.username,
        password: req.body.password,
        domens: []
      });
      newUser.save((error) => {
        if (error) return res.status(400).json({ success: false, message:  'Username already exists.' });
        res.json(newUser);
      })
    }
  }

  api.nowuser = (User, Token) => (req, res) => {
    if (Token) {
      User.find({ user_id: req.query.user_id }, (error, user) => {
        if (error) return res.status(400).json(error);
        res.status(200).json(user);
        return true;
      })
    } else return res.status(403).send({ success: false, message: 'Unauthorized' });
  }

  api.track = (User) => (req, res) => {
      User.findOne({ _id: req.body.id }, (error, user) => {
        if (error) throw error;
        if (!user) res.status(401).send({ success: false, message: 'User not found.' });
        else {
          user.domens.push({domenname: req.body.domenname})
          // console.log(user.domens)
          user.save()
          res.status(200).send({ message: 'Add Domen' })
        }
      });
  }

  api.alltrack = (User) => (req, res) => {
    User.findOne({ _id: req.body.id }, (error, user) => {
      if (error) res.status(400).json(error);

      if (user) {
        res.status(200).json(user.domens)
      }
    });
  }

  api.deletetrack = (User) => (req, res) => {
    User.findOne({ _id: req.body.id }, (error, user) => {
      if (error) throw error;
      if (!user) res.status(401).send({ success: false, message: 'User not found.' });
      else {
        // user.domens.push({domenname: req.body.domenname})
        // const i = indexOf({domenname: req.body.domenname})
        var i = 0
        user.domens.forEach(element => {
          if(element.domenname != req.body.domenname) i++;
          else{
            user.domens.splice(i, 1)
          }
        });
        
        console.log(user.domens)
        user.save()
        res.status(200).send({ message: 'Domen delete' })
      }
    });
  }

  module.exports = api;