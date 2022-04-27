// // index.js
// const { fetchMyIP, fetchCoordsByIP, fetchFlyovers} = require('./iss');

// fetchMyIP((error, ip) => {
//   if (error) {
//     console.log("It didn't work!", error);
//     return;
//   }
//   console.log('It worked! Returned IP:', ip);
// });

// fetchCoordsByIP('174.56.88.131', (error, coords) => {
//   if (error) {
//     console.log("It didn't work!", error['message']);
//     return;
//   }
//   console.log('It worked! Returned coords:', coords);
// });

// fetchFlyovers({latitude: 35.190879821777344, longitude: -106.73088836669922}, (error, flyover) => {
//   if (error) {
//     console.log("It didn't work!" , error);
//     return;
//   }
//   console.log('It worked! Returns flyovers:', flyover);
// });

const { nextISSTimesForMyLocation } = require('./iss');

const printPassTimes = function(passTimes) {
  for (const pass of passTimes) {
    const datetime = new Date(0);
    datetime.setUTCSeconds(pass.risetime);
    const duration = pass.duration;
    console.log(`Next pass at ${datetime} for ${duration} seconds!`);
  }
};

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  // success, print out the deets!
  printPassTimes(passTimes);
});