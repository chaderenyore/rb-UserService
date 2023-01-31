const logger  = require('../../logger.conf');
var net = require("net");
var port = 4001;
var conn;
exports.init_connection = (data) => {
  conn = net.createConnection(4001, "3.9.77.19");
  conn.on("connect", function () {
    logger.info("connected to server");
    conn.write(JSON.stringify({ ...data, notify: true }));
  });
  conn.on("data", function (data) {
    logger.log(data);
  });
  conn.on("error", function (err) {
    console.log("Error in connection:", err);
  });
  conn.on("close", function () {
    logger.info("connection got closed, will try to reconnect");
  });
};
