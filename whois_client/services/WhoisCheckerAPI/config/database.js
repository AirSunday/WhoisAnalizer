module.exports = (mongoose, config) => {
    const database = mongoose.connection;
    mongoose.Promise = Promise;
    mongoose.connect(config.database, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        promiseLibrary: global.Promise
    });
    database.on('error', error => console.log(`Connection to WhoisChecker database failed: ${error}`));
    database.on('connected', () => console.log('Connected to WhoisChecker database'));
    database.on('disconnected', () => console.log('Disconnected from WhoisChecker database'));
    process.on('SIGINT', () => {
      database.close(() => {
        console.log('WhoisChecker terminated, connection closed');
        process.exit(0);
      })
    });
  };