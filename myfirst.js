var http = require('http');
const bcrypt = require('bcrypt');
const saltRounds = 10; // Cost factor for hashing - 10 is a good balance between security and performance

// Replace 'passwordToHash' with the password you want to hash
const passwordToHash = 'mySecurePassword123';
var hashword = "failed";
bcrypt.hash(passwordToHash, saltRounds, (err, hash) => {
  if (err) {
    console.error('Error while hashing:', err);
  } else {
    console.log('Hashed Password:', hash);
    hashword = hash;
    // You can store this hash in your database as the user's password
  }
});

http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.end(hashword);
}).listen(8080);

