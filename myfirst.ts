var http = require('http');
var dt = require('./myfirstmodule');
var crypt = require('./encrypt'); //encryption module
const stored = "$2b$10$5jUD1fhvp1YLSE1FpnEa5eVpOZTOp5wivb6DtvrkeKfIO0/ZTCAqG";
const passwordToHash = 'mySecurePassword123';
const otherPassword = 'wrondPassword';
var hashword = "";

http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.write("The date and time are currently: " + dt.myDateTime());
  res.write("Stored Pword: " + stored);
  hashword = crypt.encrypt(passwordToHash);
  res.write("Hash Result: " + hashword);
  var result = crypt.compare(otherPassword,stored);
  res.end(hashword);
}).listen(8080);