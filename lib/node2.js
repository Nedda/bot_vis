var React = require('react');
var ReactDOM = require('react-dom');
var vis = require('vis');

var ComponentNode = React.createClass({
  nodeFunction: function(){
    var node, edges, container;
    node = vis.DataSet();
    node.add([
      {id: '1', label: "Node 1"},
      {id: '2', label: "Node 2"}
    ]);
    var edges = new vis.DataSet();
    edges.add([
      {id:'1', from: '1', to:'2' }
    ]);

    var container = document.getElementById('app');
    var data = {
      nodes: node,
      edges: edges
    };
    var options = {};
    var network = new vis.Network(container, data, options);
  },

  render: function(){
    return(
      <div>
      <div>hello world</div>
      </div>
    );
  }
});


ReactDOM.render(<ComponentNode></ComponentNode> , document.getElementById('app'));
