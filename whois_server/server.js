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
    'http://localhost:8081',
    'https://localhost:8081',
    'http://localhost:8080',
    'https://localhost:8080',
  ],
  credentials: true,
  exposedHeaders: ['set-cookie']
}));

app.use(function (req, res, next) {

  // Website you wish to allow to connec
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8081');
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

  // db.sequelize.sync({ force: true }).then(() => {
  //   console.log("Drop and re-sync db.")
  // })
  // .then(() => {
    // const whoisdbs = require("./app/controllers/whois.controller.js");
    // whoisdbs.UpdateDataBase();
  // })

  
