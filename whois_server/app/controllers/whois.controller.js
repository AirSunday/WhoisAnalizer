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
const { resolve } = require("path");
const { start } = require("repl");
const { AddDomain } = require("./users.controller");
require('dotenv').config();

// Registrantsdb.hasMany(Whoisdb, {
//   foreignKey: 'registrant'
// })
// Whoisdb.belongsTo(Registrantsdb, {
//   foreignKey: 'registrant'
// })

exports.create = (req, res) => {

    if (!req.body.domain_name) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }
    
    const whoisdb = {
      domain_name: req.body.domain_name,
      age: req.body.age,
      release_date: req.body.release_date,
      ns_servers: req.body.ns_servers,
      registrant: req.body.registrant,
    };
    
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
    Whoisdb.findAll({
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
              registrant: el.dataValues.registrant,
              ns_servers: el.dataValues.ns_servers
            }));
          })
            res.send(newData)
          
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
function AddRegistrantInDB(registrant, count){
  Registrantsdb.findOne({ where: {name: registrant} })
      .then(domainBD => {
        if(!domainBD)
          Registrantsdb.create({ name: registrant, count: count });
        else
          Registrantsdb.update({ count: domainBD.count + count }, {
                        where: { name: registrant }
                      });
  })
  .catch(err => {
    console.log("Error in AddRegistrant")
  })
} 
function AddNsServerInDB(nsServer, count) {
  NsServersdb.findOne({ where: {name: nsServer} })
      .then(domainBD => {
        if(!domainBD)
          NsServersdb.create({ name: nsServer, count: count });
        else
          NsServersdb.update({ count: domainBD.count + count }, {
                        where: { name: nsServer }
                      })
  })
  .catch(err => {
    console.log("Error in AddNsServer")
  });
}

function AddDomainInDB(doamin){
  
  Whoisdb.create(doamin)
    .catch(err => {
      console.log('Error in AddDomainInDB')
    });
}

async function FillDomainObject(line){
  let domain = line.split('	')[0].toLowerCase().trim();
  let newDomain = { 
    domain_name: '', 
    age: 0, 
    release_date: 0, 
    ns_servers: '', 
    registrant: '' 
  };

  await whoiser(domain).then(data => {
    if(typeof data['whois.tcinet.ru']['Registrar'] !== 'undefined'){
      newDomain.domain_name = domain;

      const createTime = new Date(
        data['whois.tcinet.ru']['Created Date'].split('T')[0]);
      const today = new Date();
      newDomain.age = today.getFullYear() - createTime.getFullYear();

      newDomain.release_date = data['whois.tcinet.ru']['free-date'];

      newDomain.ns_servers = data['whois.tcinet.ru']['Name Server'].join(' ');

      newDomain.registrant = data['whois.tcinet.ru'].Registrar;
    }
  });

  return newDomain;
}

function delay(timeout) {
  return new Promise(resolve => setTimeout(resolve, timeout));
} 

async function FillRegistrantDB(registrants, timeout) {
  for(const registrant of registrants){
    AddRegistrantInDB(...registrant);
    await delay(timeout);
  }
}

async function FillNsServersDB(ns_servers, timeout) {
  for(const ns_server of ns_servers){
    AddNsServerInDB(...ns_server);
    await delay(timeout);
  }
}

async function FillDomainDB(domains, timeout){ 
  for(const domain of domains){
    AddDomainInDB(domain, timeout);
    await delay(timeout);
  }
}

async function AddDamoinToDB(objAddtoBD){
  let timeoutRegistrants = Math.floor(60000 / objAddtoBD.registrant.size);
  let timeoutNsServers = Math.floor(60000 / objAddtoBD.ns_servers.size);
  let timeoutDomains = Math.floor(60000 / objAddtoBD.domains.length);
  
  FillRegistrantDB(objAddtoBD.registrant, timeoutRegistrants);
  FillNsServersDB(objAddtoBD.ns_servers, timeoutNsServers);
  FillDomainDB(objAddtoBD.domains, timeoutDomains);

}

exports.UpdateDataBase = async function() {
  const fileStream = fs.createReadStream('./app/data/new_ru_domains.txt');

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });
  var lineCount = 0;
  objAddtoBD = {
    registrant: new Map(),
    ns_servers: new Map(),
    domains: []
  };

  for await (const line of rl) {
    lineCount++;
    if(lineCount % 110 == 0 || lineCount == countStat.lineCount) {
      if(lineCount >= countStat.lineCount - 1){
        console.log('end push domains. Count domains = ' + lineCount); 
        process.env.FLAG_REQUEST = true;
      }
      console.log(lineCount + ' domains was push in BD'); 
      await delay(70000);

      AddDamoinToDB(objAddtoBD);
      objAddtoBD.registrant.clear();
      objAddtoBD.ns_servers.clear();
      objAddtoBD.domains = [];
    }

    FillDomainObject(line).then((newDomain) => {
      if(newDomain.domain_name != ''){
        const registrantCount = objAddtoBD.registrant.get(newDomain.registrant);
        registrantCount
          ? objAddtoBD.registrant.set(newDomain.registrant, registrantCount + 1)
          : objAddtoBD.registrant.set(newDomain.registrant, 1);
        
        newDomain.ns_servers.split(' ').forEach(ns => {
          let ns_serversCount = objAddtoBD.ns_servers.get(ns);
          ns_serversCount
            ? objAddtoBD.ns_servers.set(ns , ns_serversCount + 1)
            : objAddtoBD.ns_servers.set(ns , 1);
          })

        objAddtoBD.domains.push(newDomain);
      }
    })
    .catch(err => {
      console.log('error in FillDomainObject'); 
    })
  }
}

exports.DownloadDomains = (req, res) => {
  fs.readFile('app/data/URL_domains.txt', 'utf8', (err, data) => {
    if(err) console.log(err);
    else download(data)
  });
}
async function download(url) {
  if (fs.existsSync('app/data/old_ru_domains.txt')) 
    fs.unlink('app/data/old_ru_domains.txt', (err, result) => {
      if(err) console.log('NOT delete old_ru_domains.txt');
      else console.log('delete old_ru_domains.txt');
      if (fs.existsSync('app/data/ru_domains.txt')) 
        fs.rename('app/data/ru_domains.txt', 'app/data/old_ru_domains.txt', (err, result) => {
          if(err) console.log('NOT rename ru_domains.txt to old_ru_domains');
          else console.log('rename ru_domains.txt to old_ru_domains');
        });
    });
  if (fs.existsSync('app/data/ru_domains.gz')) 
    fs.unlink('app/data/ru_domains.gz', (err, result) => {
      if(err) console.log('NOT delete ru_domains.gz'); 
      else console.log('delete ru_domains.gz'); 
    });
  var file = fs.createWriteStream('app/data/ru_domains.gz');
  http.get(url, function(response) {
    console.log('create write stream ru_domains.gz'); 
    response.pipe(file);
    response.on('end', function() {
      file.close();
      console.log('start open archiv ru_domains.gz'); 
      const zlib = require('zlib');
      const fs = require('fs');
      const inputFile = fs.createReadStream('./app/data/ru_domains.gz');
      const outputFile = fs.createWriteStream('./app/data/ru_domains.txt');
      inputFile.pipe(zlib.createUnzip()).pipe(outputFile);
      console.log('end open archiv ru_domains.gz'); 
    });
  }).on('error', function(err) {
    console.log('error with archiv ru_domains.gz'); 
    fs.unlink('app/data/ru_domains.gz', (err, result) => {
      if(err) console.log('error', err);
      console.log('not delete ru_domains.gz'); 
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
  })
  .catch(err => {
    addToFile('app/data/logs.log', 'ERROR in CompareDomains');
  })
}
async function CompareFile (){
    const File = fs.createReadStream('./app/data/ru_domains.txt');
    console.log('Start Compare File');
    const rl = readline.createInterface({
      input: File,
      crlfDelay: Infinity
    });

    const liner = new lineByLine('./app/data/old_ru_domains.txt');
    console.log('Create all stream');

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
  fs.appendFile(file, str + '\n', function (err) {
    if (err) throw err;
  });
}
exports.DeleteDomain = (req, res) => {
  DeleteDomainInBD();
}

async function DeleteDomainInBD() {
  console.log('start delete domains');
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
          Registrantsdb.findOne({ where: { name: data.registrant } })
            .then(reg => {
              Registrantsdb.update({ count: reg.count - 1 }, {
                where: { name: reg.name }
              })
            })
            .catch(err => {
              console.log('ERROR delete domains');
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
                    console.log('ERROR delete domains');
                  })
              }
            })
          
            Whoisdb.destroy({ where: { domain_name : data.domain_name } })
            .catch(err => {
              console.log('ERROR delete domains');
            })

        }
      })
      .catch(err => {
        console.log('ERROR delete domains');
      })

  }
}

function CreateNews() {
  console.log('start create news');
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
    console.log('ERROR in create news');
  })
}