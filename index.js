// index.js
// where your node app starts

// init project
var express = require('express');
require("dotenv").config()
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});
app.get("/sayhi", (req, res) =>  {
  res.json({greeting: "Hi"})
})
app.get("/api/:date?", (req, res) => {
  const param = req.params.date
  let date = createDate(param)
  if(date === undefined) {
    res.json({error: "Invalid Date"})
    return 
  }
  res.json({unix: date.getTime(), utc: date.toUTCString()})
})
function isValidDate(d) {
  return d instanceof Date && !isNaN(d);
}
function createDate(dateString) {
  if (dateString === "" || dateString === undefined || dateString === null) {
    return new Date()
  } 
  let dateNumber = Number(dateString)
  if(Number.isInteger(dateNumber)) {
    dateString = dateNumber
  }
  let date = new Date(dateString)
  //new Date(1451001600000) = 2015-12-25T00:00:00.000Z
  //new Date("1451001600000") = Invalid Date
  // .....................
  if(isValidDate(date)) {
    return date
  }
  // unix
}
// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
