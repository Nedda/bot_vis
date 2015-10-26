var d3 = require('d3');

var d3Funcs = {};

var processData = function(data){
  console.log('init');
  var id = 0;
  for (var category in data) {
    for (var username in data[category]) {
      var values = {};
      for (var table in userData) {
        values[table] = {};
        values[table]['username'] = username;
      }
      values['categories']['total'] = 0;
      for (var cat in categories) {
        values['categories'][categories[cat]] = 0;
      }
      var differentUsers = [];
      for (var message in data[category][username]) {
        var accounts = message.match(ACCOUNTS_PATTERN);
        var messageType = data[category][username][message];
        values['categories'][messageType]++;
        values['categories']['total']++;
        var differentUsers = differentUsers.concat(
          accounts.filter(function (item) {
              return differentUsers.indexOf(item) < 0;
          })
        );

        values['messages']['message'] = message;
        values['messages']['type'] = messageType;
        userData['messages'].push(values['messages']);

        values['people'] = [];
        for (var i in accounts) {
          values['people'].push({
            'username': username,
            'to': accounts[i],
            'message': message
          });
        }
        userData['people'] = userData['people'].concat(values['people']);
      }
      values['categories']['id'] = id++;
      values['categories']['connections'] = differentUsers;
      values['categories']['differentUsers'] = differentUsers.length;
      userData['categories'].push(values['categories']);
      users[username] = values['categories'];
    }
  }
  return userData;
};

d3Funcs.processData = processData;

module.exports = d3Funcs;
