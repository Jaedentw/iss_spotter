const request = require("request");

const fetchMyIP = function(callback) {
  request.get('https://geo.ipify.org/api/v2/country,city,vpn?apiKey=at_7tQmAajv4oYpoMmTWcLDe1KyJsY0h&ipAddress',(error, response, body) => {
    const pBody = JSON.parse(body);
    const ip = pBody['ip'];
    callback(error, response, ip);
  });
};


module.exports = { fetchMyIP };