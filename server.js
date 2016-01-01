'user strict';
var http = require('http');
var fs = require('fs');
var url = require('url');
var PORT = process.env.PORT || 5000;
var MONTH_NAMES = ['January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];
var result = {
  unix: null,
  natural: null
};

var server = http.createServer(function(req, res) {
  // get param (last string on url)
  var param = url.parse(req.url,true).path.split('/').pop();
  var date;
  if (param === '') {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end(fs.readFileSync('index.html'));
  } else {
    if (/^\d+$/g.test(param)) { //if only numbers then unixtime
      date = new Date(param * 1000); // mult by 1000 to turn sec in milisec.
    } else {
      param = decodeURIComponent(param);
      date = new Date(param);
    }
  }

  if (date > 0) {
    res.writeHead(200, {'Content-Type': 'application/json'});
    result.natural = MONTH_NAMES[date.getUTCMonth()] +
              ' ' + date.getUTCDate() +
              ', ' + date.getUTCFullYear();
    result.unix = date.getTime() / 1000;

  } else {
    res.writeHead(400, {'Content-Type': 'application/json'});
  }

  res.end(JSON.stringify(result));
});

server.listen(PORT, function() {
  console.log('Server Running on port ' + PORT);
});
