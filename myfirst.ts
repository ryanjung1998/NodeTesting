var http = require('http');
const bcrypt = require('bcrypt');
const saltRounds = 10; // Cost factor for hashing - 10 is a good balance between security and performance
var dt = require('./myfirstmodule');
const stored = "$2b$10$5jUD1fhvp1YLSE1FpnEa5eVpOZTOp5wivb6DtvrkeKfIO0/ZTCAqG";

// Replace 'passwordToHash' with the password you want to hash
const passwordToHash = 'mySecurePassword123';
const otherPassword = 'wrondPassword';
var hashword = "";
// var res = "huh";

bcrypt.hash(passwordToHash, saltRounds, (err, hash) => {
  if (err) {
    console.error('Error while hashing:', err);
  } else {
    console.log('Hashed Password:', hash);
    // console.log(typeof hash);
    hashword = hash;
    // bcrypt.compare(passwordToHash, hashword, function(err, result) {
    //     console.log('Result:', result);
    // });
    // You can store this hash in your database as the user's password
  }
});

bcrypt.compare(passwordToHash, stored, function(err, result) {
    console.log('Result:', result);
});

http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.write("The date and time are currently: " + dt.myDateTime());
  res.write("Stored Pword: " + stored);
  res.write("Hash Result: " + hashword);
  bcrypt.compare(passwordToHash, stored, function(err, result) {
    console.log('Result:', result);
  });

  res.end(hashword);
}).listen(8080);