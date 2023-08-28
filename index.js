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
  date = createDate(param)
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
  console.log(dateString)
  // current date
  if (dateString === "" || dateString === undefined || dateString === null) {
    return new Date()
  } 
  let date = new Date(dateString)
  if(isValidDate(date)) {
    return date
  }
  
  date =  new Date(parseInt(dateString))
  if(isValidDate(date)) {
    return date
  }

  // unix
}
// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
