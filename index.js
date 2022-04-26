// index.js
const { fetchMyIP } = require('./iss');

fetchMyIP((error, response, ip) => {
  if (error) {
    callback(error, null);
    return;
  }
  if (response.statusCode !== 200) {
    const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
    callback(Error(msg), null);
    return;
  }
  console.log('It worked! Returned IP:' , ip);
});