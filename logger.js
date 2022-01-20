const moment = require("moment");

//logger is created to log each activity with method, protocol, url and time and date of the process.

const logger = (req, res, next) => {
  console.log(`${req.method}: ${req.protocol}://${req.get("host")}${req.originalUrl}: ${moment().format()}`);
  next();
};

module.exports = logger;
