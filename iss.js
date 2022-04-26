const request = require("request");

const fetchMyIP = function(callback) {
  request.get('https://geo.ipify.org/api/v2/country,city,vpn?apiKey=at_7tQmAajv4oYpoMmTWcLDe1KyJsY0h&ipAddress',(error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }
    if (response.statusCode !== 200) {
      callback(Error(`Status Code ${response.statusCode} when fetching IP: ${body}`), null);
      return;
    }
    const pBody = JSON.parse(body);
    const ip = pBody['ip'];
    callback(error, response, ip);
  });
};


module.exports = { fetchMyIP };