const bcrypt = require('bcrypt');
exports.encrypt = function(passwordToHash){
    const saltRounds = 10; // Cost factor for hashing - 10 is a good balance between security and performance
    bcrypt.hash(passwordToHash, saltRounds, (err, hash) => {
        if (err) {
          console.error('Error while hashing:', err);
        } else {
          console.log('Hashed Password:', hash);
          return hash;
        }
      });
}

exports.compare = function(password,stored){
    bcrypt.compare(password, stored, function(err, result) {
        // console.log('Result:', result);
        return result;
    });
}