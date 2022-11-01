const db = require("../models").db;
var sequelize = require('sequelize');
const whois = require('whois');
const whoiser = require('whoiser')
const Whoisdb = db.whoisdbs;
const NsServersdb = db.nsserversdbs;
const Newsdb = db.newsdbs;
const Registrantsdb = db.registrantsdbs;
const Op = db.Sequelize.Op;
const http = require('https');
const readline = require('readline');
const lineByLine = require('n-readlines');
const fs = require('fs');
require('dotenv').config();

Registrantsdb.hasMany(Whoisdb, {
  foreignKey: 'registrant'
})
Whoisdb.belongsTo(Registrantsdb, {
  foreignKey: 'registrant'
})

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
    whois.lookup(req.body.name, function(err, data) {
      res.status(201).json(data)
    });
  };

/////////////////
function AddNewDomain(newDomain){
  Whoisdb.create( newDomain )
}
function UpdateRegistrant(newDomain){
  Whoisdb.update({ registrant: newDomain.registrant  }, {
    where: { domain_name: newDomain.domain_name }
  }).then(() => {
    AddNewDomain(newDomain); // ЕЕЕЕЕЕЕЕЕЕЕЕЕЕБАТЬ какой кастыль!!!!!!!! ПЕРЕДЕЛАТЬ!!!!!!! 
  })
  .catch(err => {
    console.log("Error in updateRegistrant")
  })
}
function UpdateNsserver(newDomain){
  Whoisdb.update({ ns_servers: newDomain.ns_servers  }, {
    where: { domain_name: newDomain.domain_name }
  })
  .catch(err => {
    console.log("Error in UpdateNsserver")
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
  .catch(err => {
    console.log("Error in AddRegistrant")
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
  .catch(err => {
    console.log("Error in AddNsServer")
  })
}
exports.UpdateDataBase = (req, res) => {

  async function processLineByLine() {

    const fileStream = fs.createReadStream('./app/data/new_ru_domains.txt');

    const rl = readline.createInterface({
      input: fileStream,
      crlfDelay: Infinity
    });
    var lineCount = 0;
    for await (const line of rl) {
      lineCount++;
      console.log(lineCount);
      if(lineCount % 190 == 0) {
        addToFile('app/data/logs.log', lineCount + ' domains was push in BD'); 
        let promise = new Promise((resolve, reject) => {
          setTimeout(() => resolve("готово!"), 70000)
        });
        let result = await promise;
      }
          var domain = line.split('	')[0];
          var newDomain = {domain_name: '', age: 0, release_date: 0, ns_servers: '', registrant: 0 }

          let promise = new Promise((resolve, reject) => {

            whoiser(domain.toLowerCase().trim()).then(data => {
              if(data['whois.tcinet.ru']['Name Server'] != '') {
                newDomain.domain_name = domain.toLowerCase();
      
                const createTime = new Date(
                  data['whois.tcinet.ru']['Created Date'].split('T')[0]);
                const today = new Date();
                newDomain.age = today.getFullYear() - createTime.getFullYear();

                newDomain.release_date = data['whois.tcinet.ru']['free-date'];
                data['whois.tcinet.ru']['Name Server'].forEach(element => {
                  AddNsServer(element, newDomain)
                });
                AddRegistrant(data['whois.tcinet.ru']['Registrar'], newDomain);
              }
              resolve();
            })
          });

          await promise.then(() => {
            if(lineCount >= countStat.lineCount - 1){
              addToFile('app/data/logs.log', 'end push domains. Count domains = ' + lineCount); 
              process.env.FLAG_REQUEST = true;
            }
          })
          .catch(err => {
            console.log("Error in processLineByLine")
            addToFile('app/data/logs.log', 'error in processLineByLine'); 
          })
        }
  }
  processLineByLine();
}
exports.DownloadDomains = (req, res) => {
  fs.writeFile('./app/data/logs.log', '', () => { addToFile('app/data/logs.log', 'clear logs'); })
  fs.readFile('app/data/URL_domains.txt', 'utf8', (err, data) => {
    if(err) console.log(err);
    else download(data)
  });
}
async function download(url) {
  if (fs.existsSync('app/data/old_ru_domains.txt')) 
    fs.unlink('app/data/old_ru_domains.txt', (err, result) => {
      if(err) addToFile('app/data/logs.log', 'NOT delete old_ru_domains.txt');
      else addToFile('app/data/logs.log', 'delete old_ru_domains.txt');
      if (fs.existsSync('app/data/ru_domains.txt')) 
        fs.rename('app/data/ru_domains.txt', 'app/data/old_ru_domains.txt', (err, result) => {
          if(err) addToFile('app/data/logs.log', 'NOT rename ru_domains.txt to old_ru_domains');
          else addToFile('app/data/logs.log', 'rename ru_domains.txt to old_ru_domains');
        });
    });
  if (fs.existsSync('app/data/ru_domains.gz')) 
    fs.unlink('app/data/ru_domains.gz', (err, result) => {
      if(err) addToFile('app/data/logs.log', 'NOT delete ru_domains.gz'); 
      else addToFile('app/data/logs.log', 'delete ru_domains.gz'); 
    });
  var file = fs.createWriteStream('app/data/ru_domains.gz');
  http.get(url, function(response) {
    addToFile('app/data/logs.log', 'create write stream ru_domains.gz'); 
    response.pipe(file);
    response.on('end', function() {
      file.close();
      addToFile('app/data/logs.log', 'start open archiv ru_domains.gz'); 
      const zlib = require('zlib');
      const fs = require('fs');
      const inputFile = fs.createReadStream('./app/data/ru_domains.gz');
      const outputFile = fs.createWriteStream('./app/data/ru_domains.txt');
      inputFile.pipe(zlib.createUnzip()).pipe(outputFile);
      addToFile('app/data/logs.log', 'end open archiv ru_domains.gz'); 
    });
  }).on('error', function(err) {
    addToFile('app/data/logs.log', 'error with archiv ru_domains.gz'); 
    fs.unlink('app/data/ru_domains.gz', (err, result) => {
      if(err) console.log('error', err);
      else addToFile('app/data/logs.log', 'not delete ru_domains.gz'); 
    });
  });
};

var countStat = {
  countNew: 0, 
  countDelete: 0,
  countChange: 0,
  lineCount: 0,
}
exports.CompareDomains = (req, res) => {
  if (fs.existsSync('app/data/ru_domains.gz')) 
    fs.unlink('app/data/ru_domains.gz', (err, result) => {
      if(err) addToFile('app/data/logs.log', 'NOT delete ru_domains.gz');
      else addToFile('app/data/logs.log', 'delete ru_domains.gz');
    });
  fs.writeFile('./app/data/delete_ru_domains.txt', '', () => { addToFile('app/data/logs.log', 'clear delete_ru_domains.txt'); })
  fs.writeFile('./app/data/new_ru_domains.txt', '', () => { addToFile('app/data/logs.log', 'clear new_ru_domains.txt'); })
  CompareFile().then(() => {
    addToFile('app/data/logs.log', 'END compare file. ' + countStat);
    if (fs.existsSync('app/data/old_ru_domains.txt')) 
      fs.unlink('app/data/old_ru_domains.txt', (err, result) => {
        if(err) addToFile('app/data/logs.log', 'NOT delete old_ru_domains.txt');
        else addToFile('app/data/logs.log', 'delete old_ru_domains.txt');
      });
    CreateNews();
    DeleteDomainInBD();
  })
  .catch(err => {
    addToFile('app/data/logs.log', 'ERROR in CompareDomains');
  })
}
async function CompareFile (){
    const File = fs.createReadStream('./app/data/ru_domains.txt');
    addToFile('app/data/logs.log', 'Start Compare File');
    const rl = readline.createInterface({
      input: File,
      crlfDelay: Infinity
    });

    const liner = new lineByLine('./app/data/old_ru_domains.txt');
    addToFile('app/data/logs.log', 'Create all stream');

    let oldLine =  liner.next().toString('ascii'); 
    for await (const line of rl) {
      // if(countStat.lineCount == 180000) return; // МОЖЕТ ДОБАВИТЬ В ПРОДАКЩЕН????
      countStat.lineCount++;
      compareLine = oldLine.split('	')[0] == false
                    ? line.split('	')[0].localeCompare(oldLine.split('	')[0]) 
                    : -1;
      if(compareLine == 0) {
        if(line.localeCompare(oldLine) != 0){ 
          addToFile('./app/data/new_ru_domains.txt', line);
          addToFile('./app/data/delete_ru_domains.txt', line);
          countStat.countChange++;
        }
        oldLine = liner.next().toString('ascii');
      }
      else if(compareLine < 0) {
        addToFile('./app/data/new_ru_domains.txt', line);
        countStat.countNew++;
      }
      else {
        while(compareLine > 0){
          countStat.countDelete++;
          addToFile('./app/data/delete_ru_domains.txt', line);
          oldLine = liner.next().toString('ascii');
          compareLine = line.split('	')[0].localeCompare(oldLine.split('	')[0]);
          if(compareLine == 0){
            if(line.localeCompare(oldLine) != 0){
              countStat.countChange++;
              addToFile('./app/data/new_ru_domains.txt', line);
              addToFile('./app/data/delete_ru_domains.txt', line);
            }
            oldLine = liner.next().toString('ascii');
          }
          else if(compareLine < 0){
            countStat.countNew++;
            addToFile('./app/data/new_ru_domains.txt', line);
          }
        }
      }
    }
}
function addToFile(file, str) {
  if(file == 'app/data/logs.log') console.log(str);
  fs.appendFile(file, str + '\n', function (err) {
    if (err) throw err;
  });
}
exports.DeleteDomain = (req, res) => {
  DeleteDomainInBD();
}

async function DeleteDomainInBD() {
  addToFile('app/data/logs.log', 'start delete domains');
  const fileStream = fs.createReadStream('./app/data/delete_ru_domains.txt');

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });
  for await (const line of rl) {
    let domainName = line.split('	')[0].toLowerCase();
    Whoisdb.findOne({ where: { domain_name: domainName } })
      .then(data => {
        if(data){
          Registrantsdb.findOne({ where: { registrant_id: data.registrant } })
            .then(reg => {
              Registrantsdb.update({ count: reg.count - 1 }, {
                where: { name: reg.name }
              })
            })
            .catch(err => {
              addToFile('app/data/logs.log', 'ERROR delete domains');
            })
          
          
            data.ns_servers.split(' ').forEach(serv => {
              if(serv != ''){
                NsServersdb.findOne({ where: {name:  serv } })
                  .then(ns => {
                    NsServersdb.update({ count: ns.count - 1 }, {
                      where: { name: ns.name }
                    })
                  })  
                  .catch(err => {
                    addToFile('app/data/logs.log', 'ERROR delete domains');
                  })
              }
            })
          
            Whoisdb.destroy({ where: { domain_name : data.domain_name } })
            .catch(err => {
              addToFile('app/data/logs.log', 'ERROR delete domains');
            })

        }
      })
      .catch(err => {
        addToFile('app/data/logs.log', 'ERROR delete domains');
      })

  }
}

function CreateNews() {
  addToFile('app/data/logs.log', 'start create news');
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  var yyyy = today.getFullYear();
  let text = `News of changes in the statistics of the zone .ru:\n
              ${countStat.countNew} domains were added;\n
              ${countStat.countDelete} domains were deleted;\n
              ${countStat.countChange} domains were changed;
              Total domains ${countStat.lineCount}.`;
  newNews = {
    title: 'Domain statistics ' + mm + '.' + dd + '.' + yyyy + '.', 
    preview: text.substring(0, 80),
    text: text,
  };

  Newsdb.create(newNews)
  .catch(err => {
    addToFile('app/data/logs.log', 'ERROR in create news');
  })
}