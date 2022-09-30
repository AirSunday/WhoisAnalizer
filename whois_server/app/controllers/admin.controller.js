const db = require("../models").db;
const { resolve } = require("bluebird");
const { response } = require("express");
var sequelize = require('sequelize');
const Newsdb = db.newsdbs;
const Sessiondb = db.sessionsdbs;
const Usersdb = db.usersdbs;
const Op = db.Sequelize.Op;

const FindSession = (req) => {
    console.log(2)
    var nowSid;
    try {
    nowSid = (req.headers.cookie).split('%3A')[1].split('.')[0];
    } catch(e){
    nowSid = '';
    }
    return new Promise((resolve, reject) => {
        Sessiondb.findOne({where: { sid: nowSid } })
            .then(session => {
                if(session && JSON.parse(session.data).passport){
                    resolve(JSON.parse(session.data).passport.user);
                }
                resolve(0);
            })
    })
}  
  
const FindAdmin = (val) => {
    return new Promise((resolve, reject) => {
        if(val != 0){
            Usersdb.findOne({ where: { userId: val } })
            .then(user => {
                if(user && user.dataValues.role == "admin"){
                    resolve(true);
                }
                resolve(false);
            })
        }
        else resolve(false);
    })
}

exports.GetAllUsers = (req, res) => {
    FindSession(req).then(val => {
        FindAdmin(val).then(role => {
            if(!role) return;

            const id = req.params.id;
            Usersdb.findAll({ order: ['userId'], offset: (id - 1)*10, limit: 10 }).then(response => {
                var users = []
                response.forEach(element => {
                    users.push(element.dataValues);
                });
                res.send(users);
            })
        })
    })
}

exports.GetCountUsers = (req, res) => {
    FindSession(req).then(val => {
        FindAdmin(val).then(role => {
            if(!role) return;
            
            Usersdb.findAll({
                attributes: [ 
                [sequelize.fn('count', sequelize.col('name')), 'name_count']
                ],
            }).then(count => {
                if(count) res.send(count);
            })
        })
    })
}

exports.DeleteUser = (req, res) => {
    FindSession(req).then(val => {
        FindAdmin(val).then(role => {
            if(val != req.body.userId)
                Usersdb.destroy({ where: { userId : req.body.userId }})
                    .then(() => {
                        res.status(200).send({
                            message: "delete complite"
                        })
                }).catch(() => {
                    res.status(500).send({
                        message: "delete not complite"
                    });
                })
        })
    })
}

exports.CreateNews = (req, res) => {
    FindSession(req).then(val => {
        FindAdmin(val).then(role => {
            if(!role) return;
            newNews = {
                title: req.body.title, 
                preview: req.body.text.substring(0, 80),
                text: req.body.text,
            };

            Newsdb.create(newNews)
                .then(data => {
                    res.send(data);
                });
        })
    })
}

exports.ChangeNews = (req, res) => {
    FindSession(req).then(val => {
        FindAdmin(val).then(role => {
            if(!role) return;

            Newsdb.findOne({ where : { news_id : req.body.news_id } })
                .then(news => {
                    if(news){
                        news.title = req.body.title == '' ?  news.title : req.body.title;
                        news.text = req.body.text == '' ?  news.text : req.body.text;

                        news.save().then(response => {
                            res.send();
                        });
                    }
                })
        })
    })
}

exports.DeleteNews = (req, res) => {
    FindSession(req).then(val => {
        FindAdmin(val).then(role => {
            if(!role) return;

            Newsdb.destroy({ where: { news_id : req.body.news_id }})
                .then(data => {
                    res.send(data);
            });
        })
    })
}

exports.ChangeRole = (req, res) => {
    FindSession(req).then(val => {
        FindAdmin(val).then(role => {
            if(!role) return;
            if(val != req.body.userId)
                Usersdb.findOne({ where: { userId : req.body.userId }})
                    .then(user => {
                        if(user){
                            if(user.role == 'admin') user.role = 'user';
                            else user.role = 'admin'
                        }
                        user.save().then(() => {
                            res.status(200).send({
                                message: "update complite"
                            });
                        }).catch(() => {
                            res.status(500).send({
                                message: "update not complite"
                            });
                        })
                });
        })
    })
}