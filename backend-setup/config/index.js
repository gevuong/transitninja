var configValues = require('./config'); // ./ means it's local

module.exports = {
  getDBConnectionString: function() {
    return 'mongodb://' + configValues.username + ':' + configValues.password + '@ds057234.mlab.com:57234/nodetodosample';
  }
};

//mongodb://<dbuser>:<dbpassword>@ds057234.mlab.com:57234/nodetodosample
