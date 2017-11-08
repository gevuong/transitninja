// setup config folder to separate config connection from everything else. This allows you to easily change configuration to development config or production config.
var configValues = require('./config');


// returns connection string to the DB to connect to Mongo via Mongoose. You can pass in an option as an arg to determine if you want dev or prod, and return proper connection string.
module.exports = {
  getDBConnectionString: function() {
    return 'mongodb://' + configValues.username + ':' + configValues.password + '@ds251845.mlab.com:51845/public_transit_systems';
  }
};

//mongodb://<dbuser>:<dbpassword>@ds057234.mlab.com:57234/nodetodosample

// In real environments, you want to encrypt the uname and pw, instead of storing uname and pw to DB in plain text in index.js. This means you would have a decrypter in this file that is required
