const winston = require('winston');
const moment = require("moment");
const config = require("config");

const getTime = () => moment().utcOffset(8).format("YYYY-MM-DD HH:mm:ss");
const logger = new winston.Logger({});
if (config.get("log.console")) {
  logger.add(winston.transports.Console, {
    timestamp: getTime,
    json: true,
    stringify: obj => JSON.stringify(obj, null, 0).replace(/\n/g, "")
  });
}

module.exports = logger;
