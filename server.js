'user strict';
var http = require('http');
var url = require('url');
var PORT = 3000;

var server = http.createServer(function(req, res) {
  var param = url.parse(req.url,true).path.split('/').pop();
  console.log(param);
  res.setHeader('Content-Type', 'application/json');
  var result = {message: 'se eh loko'};

  res.writeHead(200);
  res.end(JSON.stringify(result));
});

server.listen(PORT, function() {
  console.log('Server Running on port ' + PORT);
});
