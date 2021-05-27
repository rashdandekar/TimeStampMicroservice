// server.js
// where your node app starts

// init project
var express = require('express');
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

function isValidDate(input){
  return input instanceof Date && !isNaN(input.getTime());
}

function sendDate(req, res){
  var inputdate=req.params.date;
  if (inputdate==null){
    res.json({utc:(new Date()).toLocaleTimeString()});
  }
  if (isValidDate(new Date(inputdate))){
    inputdate=new Date(inputdate);
    res.json({unix:inputdate.getTime(),utc:inputdate.toUTCString()});
  }
  else if(!isNaN(inputdate) && inputdate.length>0){
    var utcdate=new Date(parseInt(inputdate));

    //inputdate=inputdate.toUTCString();
    res.json({unix:parseInt(inputdate),utc:utcdate.toUTCString()});
  }
  else{
    res.json({error:'Invalid data'});
  }
  
}
// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});


app.get("/api/:date?",sendDate);


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
