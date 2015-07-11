var Reflux = require('reflux');
var BotActions = require('../actions/BotActions');

var BotStore = Reflux.createStore({
  _collection: {},
  listenables: BotActions,
  init() {

  }
});

module.exports = BotStore;
