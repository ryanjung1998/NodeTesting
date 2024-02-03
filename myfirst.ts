var http = require('http');
var fs = require('fs');
var url = require('url');

http.createServer(function (req, res) {
  var q = url.parse(req.url, true);
  fs.readFile('demofile1.html', function(err, data) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(data);
    return res.end();
  });
}).listen(8080);