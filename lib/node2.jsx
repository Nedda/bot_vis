var React = require('react');
var ReactDOM = require('react-dom');
var d3 = require('d3');

var ComponentNode = React.createClass({
  render: function(){
    return(
      <div>
        <div>hello world</div>
      </div>
    );
  }
});

module.exports = ComponentNode;
ReactDOM.render(<ComponentNode></ComponentNode> , document.getElementById('app'));
