var React = require('react');
var ReactDOM = require('react-dom');
var d3Funcs = require('./d3charting.js');


var processData = d3Funcs.processData;

console.log(processData);

var ComponentNode = React.createClass({
  render: function(){
    return(
      <div>
        <div>bot vis</div>
        <div>hello world</div>
        {d3Funcs.draw()}
      </div>
    );
  }
});

module.exports = ComponentNode;
