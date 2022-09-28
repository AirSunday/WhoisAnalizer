require('module-alias/register');
const http = require('http'),
      WhoisCheckerAPI = require('@WhoisCheckerAPI'),
      WhoisCheckerServer = http.Server(WhoisCheckerAPI),
      WhoisCheckerPORT = process.env.PORT || 3001,
      LOCAL = '0.0.0.0';
WhoisCheckerServer.listen(WhoisCheckerPORT, LOCAL, () => console.log(`WhoisCheckerAPI running on ${WhoisCheckerPORT}`));