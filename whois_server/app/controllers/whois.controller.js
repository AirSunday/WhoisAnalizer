const db = require("../models").db;
var sequelize = require('sequelize');
const whois = require('whois');
const { rawListeners } = require("process");
const { Console } = require("console");
// const { registrantsdbs } = require("../models");
const Whoisdb = db.whoisdbs;
const NsServersdb = db.nsserversdbs;
const Registrantsdb = db.registrantsdbs
const Op = db.Sequelize.Op;

Registrantsdb.hasMany(Whoisdb, {
  foreignKey: 'registrant'
})
Whoisdb.belongsTo(Registrantsdb, {
  foreignKey: 'registrant'
})


// Create and Save a new Tutorial
exports.create = (req, res) => {
    // Validate request
    if (!req.body.domain_name) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }
    // Create a Whoisdb
    const whoisdb = {
      domain_name: req.body.domain_name,
      age: req.body.age,
      release_date: req.body.release_date,
      ns_servers: req.body.ns_servers,
      registrant: req.body.registrant,
    };
    // Save Tutorial in the database
    Whoisdb.create(whoisdb)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the WhoisDB."
        });
      });
  };
// Retrieve all WhoisDB from the database.
exports.findAll = (req, res) => {
    const domainName = req.query.domain_name;
    Whoisdb.findAll({ where: domainName })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving WhoisDB."
        });
      });
  };
// Find a single Tutorial with an id
exports.Get10 = (req, res) => {
    const id = req.params.id;
    Whoisdb.findAll({ include: Registrantsdb,
     order: ['release_date'], offset: (id - 1)*10, limit: 10 
  })
      .then(data => {
        if (data) {
          var domainNode = function(domain){
              this.id = domain.id,
              this.domain_name = domain.domain_name,
              this.age = domain.age,
              this.release_date = domain.release_date,
              this.registrant = domain.registrant,
              this.ns_servers = domain.ns_servers
          }
          var newData = [];
          data.forEach(el => {
            newData.push( new domainNode({
              id: el.dataValues.id,
              domain_name: el.dataValues.domain_name,
              age: el.dataValues.age,
              release_date: el.dataValues.release_date,
              registrant: el.dataValues.registrantsdb.dataValues.name,
              ns_servers: el.dataValues.ns_servers
            }));
          })
            // console.log(newData)
            res.send(newData)
          // console.log(data[2].dataValues)
          
        } else {
          res.status(404).send({
            message: `Cannot find WhoisDB with id=${id}.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving WhoisDB with id=" + id
        });
      });
  };

  exports.GetNsServers = (req, res) => {
    const id = req.params.id;
    NsServersdb.findAll({
      order: [['count', 'DESC']], offset: (id - 1)*20, limit: 20 
    })
      .then(data => {
        if (data) {
          res.send(data);
        } else {
          res.status(404).send({
            message: `Cannot find WhoisDB NsServers.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving WhoisDB with NsServers" 
        });
      });
  };

  exports.GetRegistrant = (req, res) => {
    Registrantsdb.findAll({ order: [['count', 'DESC']] })
      .then(data => {
        if (data) {
          res.send(data);
        } else {
          res.status(404).send({
            message: `Cannot find WhoisDB Registrant.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving WhoisDB with NsServers" 
        });
      });
  };

  exports.GetCountDomain = (req, res) => {
    const table = req.params.table;
    if(table == 'domain') {
      Whoisdb.findAll({
        attributes: [ 
          [sequelize.fn('count', sequelize.col('registrant')), 'reg_count']
        ],
      })
        .then(data => {
          if (data) {
            res.send(data);
          } else {
            res.status(404).send({
              message: `Cannot find WhoisDB Registrant.`
            });
          }
        })
        .catch(err => {
          res.status(500).send({
            message: "Error retrieving WhoisDB with NsServers" 
          });
        });
    }
    else if(table == 'nsservers') {
      NsServersdb.findAll({
        attributes: [ 
          [sequelize.fn('count', sequelize.col('name')), 'reg_count']
        ],
      })
        .then(data => {
          if (data) {
            res.send(data);
          } else {
            res.status(404).send({
              message: `Cannot find WhoisDB Registrant.`
            });
          }
        })
        .catch(err => {
          res.status(500).send({
            message: "Error retrieving WhoisDB with NsServers" 
          });
        });
    }
  };


exports.GetWhoisInfo = (req, res) => {
  // res.cookie('token', '12345ABCDE');
  // res.send('Set Cookie');
  
    whois.lookup(req.body.name, function(err, data) {
      res.status(201).json(data)
    });
};

function AddNewDomain(newDomain){
  Whoisdb.create( newDomain )
}

function UpdateRegistrant(newDomain){
  Whoisdb.update({ registrant: newDomain.registrant  }, {
    where: { domain_name: newDomain.domain_name }
  })
}

function UpdateNsserver(newDomain){
  Whoisdb.update({ ns_servers: newDomain.ns_servers  }, {
    where: { domain_name: newDomain.domain_name }
  })
}

function AddRegistrant(registrant, newDomain){
  Registrantsdb.findOne({ where: {name: registrant} })
      .then(domainBD => {
        if(!domainBD) {
            Registrantsdb.create({ name: registrant, count: 1 })
              .then(res => { 
                newDomain.registrant = res.registrant_id;
                UpdateRegistrant(newDomain);
              })
        }
        else {
          Registrantsdb.update({ count: domainBD.count + 1 }, {
                        where: { name: registrant }
          }).then((res) => { 
            newDomain.registrant = domainBD.registrant_id;
            UpdateRegistrant(newDomain);
          });
        }
  })
} 

function AddNsServer(nsServer, newDomain) {
  NsServersdb.findOne({ where: {name: nsServer} })
      .then(domainBD => {
        if(!domainBD) {
          NsServersdb.create({ name: nsServer, count: 1 })
              .then(res => { 
                newDomain.ns_servers += res.name + " ";
                UpdateNsserver(newDomain);
              })
        }
        else
          NsServersdb.update({ count: domainBD.count + 1 }, {
                        where: { name: nsServer }
          }).then((res) => { 
            newDomain.ns_servers += domainBD.name + " ";
            UpdateNsserver(newDomain);
          });
  })
}

exports.UpdateDataBase = (req, res) => {

  const fs = require('fs');
  const readline = require('readline');
  
  async function processLineByLine() {
    // const fileStream = fs.createReadStream('D:\\ВУЗ\\диплом\\test.txt');
    const fileStream = fs.createReadStream('D:\\ВУЗ\\диплом\\ru_domains.txt');
    
    const rl = readline.createInterface({
      input: fileStream,
      crlfDelay: Infinity
    });
    var lineCount = 0;
    for await (const line of rl) {
          var domain = line.split('	')[0];
          var newDomain = {domain_name: '', age: 0, release_date: 0, ns_servers: '', registrant: 0 }

          let promise = new Promise((resolve, reject) => {

            whois.lookup(domain.toLowerCase().trim(), function(err, data) {
              lineCount++;
              console.log("_____________________________" + lineCount + "_____________________________") 
              newDomain.domain_name = domain.toLowerCase();
              data.split('\n').forEach((element, key, data) => {
                if (element.indexOf('nserver') >= 0)
                  AddNsServer(element.replace('nserver:', '').trim(), newDomain )
                else if (element.indexOf('registrar') >= 0)
                  AddRegistrant(element.replace('registrar:', '').trim(), newDomain )
                else if (element.indexOf('free-date:') >= 0) 
                  newDomain.release_date = element.replace('free-date:', '').trim()
                else if (element.indexOf('created:') >= 0){
                  const createTime = new Date(
                      element.replace('created:', '').trim().split('T')[0]);
                  const today = new Date();
                  newDomain.age = today.getFullYear() - createTime.getFullYear();
                }
                if (Object.is(data.length - 1, key)) {
                  resolve();
                }
              })
            })

          });

          await promise.then(() => {
            if(newDomain.release_date != 0) AddNewDomain(newDomain)
            else{
              console.log(newDomain)
            }
          });
        }
  }
  processLineByLine();
}