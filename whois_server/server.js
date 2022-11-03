const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
require('dotenv').config();
const session = require('express-session');
const passport = require('passport');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const cookieParser = require('cookie-parser');
const passportConfig = require('./app/config/passport');
const sequelize = require('./app/models/index').sequelize;

require('./app/models/users.model.js');
require('./app/models/session.model.js');

app.use(cors({
  origin: [
    process.env.IP_HOST,
    'http://188.68.222.76:80',
    // 'https://localhost:8081',
    // 'http://localhost:8080',
    // 'https://localhost:8080',
  ],
  credentials: true,
  exposedHeaders: ['set-cookie']
}));

app.use(function (req, res, next) {

  // Website you wish to allow to connec
  res.setHeader('Access-Control-Allow-Origin', process.env.IP_HOST);
  // res.setHeader('Access-Control-Allow-Origin', 'http://172.20.10.5:8081');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});


// parse requests of content-type - application/json
app.use(bodyParser.json());
app.use(cookieParser());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Alexander application." });
});

require("./app/routes/whois.routes.js")(app);
// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

passportConfig(passport);
  app.use(session({
    secret:  process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: false,
      // credentials: 'include',
      secure: false,
      maxAge: 30 * 24 * 60 * 60 * 1000, // 1 month
    },
    store: new SequelizeStore({
      db: sequelize,
      table: 'sessionsdbs',
      logging: false
   }),
  }));

  app.use(passport.initialize());
  app.use(passport.session());

  app.post('/api/sign-in', require('./app/controllers/sign-in'));
  app.post('/api/sign-out', require('./app/controllers/sign-out'));

const db = require("./app/models");
db.sequelize.sync()
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });

  var cron = require('node-cron');

  // cron.schedule('0 0 * * *', () => { // min hore day mounth year (every day 00:00)
  cron.schedule('00 19 * * *', () => { // min hore day mounth year (every day 00:00)
    if(process.env.FLAG_REQUEST == 'true'){
      require("./app/controllers/users.controller.js").CheckUsersDomain();
    }
  });

  cron.schedule('40 19 * * *', () => { // min hore day mounth year (every day 01:00)
    if(process.env.FLAG_REQUEST == 'true'){
      require("./app/controllers/whois.controller.js").DownloadDomains();
    }
  });

  cron.schedule('00 20 * * *', () => { // min hore day mounth year (every day 02:00)
    if(process.env.FLAG_REQUEST == 'true'){
      require("./app/controllers/whois.controller.js").CompareDomains();
    }
  });

  cron.schedule('50 20 * * *', () => { // min hore day mounth year (every day 02:00)
    if(process.env.FLAG_REQUEST == 'true'){
      require("./app/controllers/whois.controller.js").DeleteDomainInBD();
    }
  });

  cron.schedule('50 21 * * *', () => { // min hore day mounth year (every day 03:00)
    if(process.env.FLAG_REQUEST == 'true'){
      process.env.FLAG_REQUEST = false;
      require("./app/controllers/whois.controller.js").UpdateDataBase();
    }
  });


  // db.sequelize.sync({ force: true }).then(() => {
  //   console.log("Drop and re-sync db.")
  // })
  // .then(() => {
  //    const whoisdbs = require("./app/controllers/whois.controller.js");
  //    whoisdbs.UpdateDataBase();
  // })