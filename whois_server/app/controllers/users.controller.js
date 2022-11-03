const db = require("../models").db;
var sequelize = require('sequelize');
const Usersdb = db.usersdbs;
const Newsdb = db.newsdbs;
const Sessiondb = db.sessionsdbs;
const Op = db.Sequelize.Op;
const transporter = require('../config/email.config');
const whois = require('whois');

async function FindSession (req, res) {
  // console.log(req.headers.cookie)
  var nowSid;
  try {
    nowSid = (req.headers.cookie).split('%3A')[1].split('.')[0];
  } catch(e){
    nowSid = '';
  }
  return await Sessiondb.findOne({where: { sid: nowSid } }).then(session => {
    if(session && JSON.parse(session.data).passport){
        return JSON.parse(session.data).passport.user;
      }
    return 0;
  })
} 

exports.Authentication = (req, res) => {
  FindSession(req).then(val => {
    res.send({ userId: val });
  })
  
}
exports.getUserById = userId => Usersdb.findOne({
  where: { userId },
});
exports.getUserByEmail = email => Usersdb.findOne({
  where: { email },
});
exports.create = (req, res) => {
  Usersdb.findAll({
    attributes: [ 
      [sequelize.fn('count', sequelize.col('name')), 'user_count']
    ],
  })
    .then(data => {
      
      const usersdb = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        role: 'user',
        status: '',
        domains: '',
      };
      if (data[0].dataValues.user_count == 0) usersdb.role = 'admin';
      
        // Save Tutorial in the database
      Usersdb.create(usersdb)
      .then(data => {
        res.send(data);
        // require('./app/controllers/sign-in')({email: req.body.email, password: req.body.password})
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the User."
        });
      });
    })
};
exports.findOneId = (req, res) => {
  const id = req.body.userId;
  Usersdb.findOne({ where: {userId: id} })
  .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.send({
          status: false,
          message: `Cannot find Usersdb with userId=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Usersdb with Email=" + id
      });
    });
};
exports.findOneEmail = (req, res) => {
  const email = req.body.email;
  Usersdb.findOne({ where: {email: email} })
  .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.send({
          status: false,
          message: `Cannot find Usersdb with email=${email}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Usersdb with Email=" + email
      });
    });
};
exports.update = (req, res) => {
  const id = req.body.userId;

  Usersdb.findOne({ where: { userId: id }}).then(user => {
    if(user){
      user.name = req.body.name == '' ? user.name : req.body.name;
      user.email = req.body.email == '' ? user.email : req.body.email;
      user.password = req.body.password == '' ? user.password : req.body.password;
    }
  
    user.save().then(response => {
      res.status(200).send({
        message: "update complite"
      });
    }).catch(err => {
      res.status(500).send({
        message: "Error update"
      });
    })
  })  
};
exports.delete = (req, res) => {
  const mail = req.params.email;
  Whoisdb.destroy({
    where: { email: mail  }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "User was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete User with Email=${mail}. Maybe User was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete User with id=" + id
      });
    });
};
exports.AddDomain = (req, res) => {
    const id = req.body.userId;
    Usersdb.findOne({ where: { userId: id } }).then(user => {
      if(user){
        user.domains += user.domains == '' ? req.body.domainName :  ' ' + req.body.domainName;
      }
    
      user.save().then(response => {
        res.status(200).send({
          message: "Add domain complite"
        });
      }).catch(err => {
        res.status(500).send({
          message: "Add domain update"
        });
      })
    });
};
exports.DeleteDomain = (req, res) => {
    const id = req.body.userId;
    Usersdb.findOne({ where: { userId: id } }).then(user => {
      if(user){
        user.domains = user.domains.replace(req.body.domainName, '').trim();
      }
    
      user.save().then(response => {
        res.status(200).send({
          message: "Delete domain complite"
        });
      }).catch(err => {
        res.status(500).send({
          message: "Delete domain update"
        });
      })
    });
};
exports.GetDomain = (req, res) => {
    const id = req.body.userId;
    console.log(req.body)
    Usersdb.findOne({ where: { userId: id } })
      .then(data => {
        if (data) {
          res.send({ domains: data.domains});
        } else {
          res.send({
            status: false,
            message: `Cannot find Usersdb with id=${id}.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving Usersdb with id=" + id
        });
      });
};
exports.GetNews = (req, res) => {
  var page = req.body.page;
  var count = req.body.count;
  var arrNews = [];
  Newsdb.findAll({attributes: [ 'news_id', 'title', 'preview', 'updatedAt'], order: [['updatedAt', 'DESC']], offset: (page - 1)*count, limit: count })
    .then(response => {
      response.forEach(element => {
        arrNews.push(element.dataValues);
      });
      res.send(arrNews);
    })
}
exports.GetNewsText = (req, res) => {
  Newsdb.findOne({attributes: [ 'text' ], where: { news_id : req.body.news_id } }).then(response => {
    res.send(response);
  })
}
exports.GetCountNews = (req, res) => {
    Newsdb.findAll({
        attributes: [ 
          [sequelize.fn('count', sequelize.col('title')), 'title_count']
        ],
    }).then(count => {
        if(count) res.send(count);
    })
}
exports.GetUserRole = (req, res) => {
  Usersdb.findOne({ attributes: ['role'], where: {userId: req.body.userId} })
    .then(role => {
      res.send({role: role});
    })
}

function SendMessage(name, email, domain){
  transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: 'dom2564@icloud.com', // email FOR RELEASE BUT FOR DEBAUG USE dom2564@icloud.com
    subject: 'Message from WhoisAnaliz',
    text: `The domain name ${domain} you were tracking has been released`,
    html:
      `Diar ${name}, The domain name <i>${domain}</i> you were tracking has been <strong>released</strong>`,
  })
}

const whoiser = require('whoiser', {follow: 1})
async function WhoisGet(domain) {
  let domainInfo = await whoiser.domain(domain);
  return Object.values(domainInfo)[0]['Name Server'];
  }

exports.CheckUsersDomain = () => {

  Usersdb.findAll({ where : { [Op.not]: {'domains' : '' } } })
    .then(response => {
      response.forEach(user => {
        user.dataValues.domains.split(' ').forEach(domain => {
          WhoisGet(domain).then(res => {
            if(res.length == 0)
              SendMessage(user.dataValues.name, user.dataValues.email, domain);
          })
        })
      });
    })

  
}