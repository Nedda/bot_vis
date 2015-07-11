var Reflux = require('reflux');

var BotActions = Reflux.createActions([
  "setCollection",
  "add",
  "update",
  "remove"
]);

module.exports = BotActions;
