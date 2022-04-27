// index.js
const { fetchMyIP, fetchCoordsByIP, fetchFlyovers } = require('./iss');

fetchMyIP((error, ip) => {
  if (error) {
    console.log("It didn't work!", error);
    return;
  }
  console.log('It worked! Returned IP:', ip);
});

fetchCoordsByIP('174.56.88.131', (error, coords) => {
  if (error) {
    console.log("It didn't work!", error['message']);
    return;
  }
  console.log('It worked! Returned coords:', coords);
});

fetchFlyovers(lat, lon, (error, flyover) => {
  if (error) {
    console.log("It didn't work!" , error);
    return;
  }
  console.log('It worked! Returns flyovers:', flyover);
});