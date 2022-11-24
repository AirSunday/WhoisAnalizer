require("dotenv").config();
module.exports = {
  HOST: process.env.DATABASE_HOST,
  USER: process.env.DATABASE_USERNAME,
  PASSWORD: process.env.DATABASE_PASSWORD,
  DB: process.env.DATABASE_NAME,
  PORT: 5432,
  dialect: "postgres",
  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};

//   const Sequelize = require('sequelize');

//   //GET ENV VARIABLES FROM
//   const sequelize = new Sequelize(
//     process.env.DATABASE_NAME,
//       process.env.DATABASE_USERNAME,
//       process.env.DATABASE_PASSWORD,
//       {
//           host: process.env.DATABASE_HOST,
//           dialect: 'postgres',
//           pool: {
//                   max: 5,
//                   min: 0,
//                   acquire: 30000,
//                   idle: 10000
//                 }
//       });

// module.exports = sequelize;
