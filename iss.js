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
    callback(error, ip);
  });
};

const fetchCoordsByIP = function(ip, callback) {
  request.get(`https://api.ipbase.com/v2/info?apikey=6nilCr2ulyr9SFcaAGifgw2Ycn9GgtZKOnKOf5xq&ip=${ip}`, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching coordinates for IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    const parsed = JSON.parse(body);
    const path = parsed['data']['location'];
    const longitude = path['longitude'];
    const latitude = path['latitude'];
    callback(error, {latitude, longitude});
  });
};

const fetchFlyovers = function(coords, callback) {
  request.get(`https://iss-pass.herokuapp.com/json/?lat=${coords['latitude']}&lon=${coords['longitude']}`, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }
    if (response.statusCode !== 200) {
      const failure = `Status Code ${response.statusCode} when fetching coordinates for IP. Response: ${body}`;
      callback(Error(failure), null);
      return;
    }
    const Response = JSON.parse(body).response;
    callback(error, Response);
  });
};

const nextISSTimesForMyLocation = function(callback) {
  fetchMyIP((error, ip) => {
    if (error) {
      return callback(error, null);
    }

    fetchCoordsByIP(ip, (error, loc) => {
      if (error) {
        return callback(error, null);
      }

      fetchFlyovers(loc, (error, nextPasses) => {
        if (error) {
          return callback(error, null);
        }

        callback(null, nextPasses);
      });
    });
  });
};

module.exports = { nextISSTimesForMyLocation };