var d3 = require('d3');
var TAFFY = require('taffy');

var ACCOUNTS_PATTERN = /\B@[a-z0-9_-]+/gi;

var categories = {
  CONTRIBUTION:'valido',
  CHEERLEADER:'porristas'
};

var users = {};

var userData = {
  'categories': [],
  'messages': [],
  'people': []
};

var maxMessages = 0;
var minMessages = 0;
var minSize = 10;
var maxSize = 50;
var maxValues = {};
var minValues = {};

// Viz
var width = window.innerWidth,
    height = window.innerHeight;

var color = d3.scale.category20();

var force = d3.layout.force()
    .charge(-120)
    .linkDistance(150)
    .size([width, height]);

var drag = force.drag()
    .on("dragstart", dragstart);

var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height);

d3.json("json/bot.json", function(error, graph) {
  if (error) throw error;
  var tables = processData(graph);
  console.log(tables);
  var tableMessages = TAFFY(tables['messages']);
  var tableCategories = TAFFY(tables['categories']);
  var tablePeople = TAFFY(tables['people']);
  maxMessages = tableCategories().max('total');
  minMessages = tableCategories().min('total');
  for (var cat in categories) {
    var category = categories[cat];
    maxValues[category] = tableCategories().max(category);
    minValues[category] = tableCategories().min(category);
  }
  var filter = {};
  filter[categories.CONTRIBUTION] = {"gt":"0"};
  maxValues[categories.CONTRIBUTION] = tableCategories(filter).max(category);
  console.log(minValues);
  var info = {
    nodes:[],
    links:[]
  };
  for (var username in users) {
    var arrNode = users[username];
    arrNode['name'] = username;
    arrNode['group'] = 1;
    info.nodes.push(arrNode);
    for (var i in users[username].connections) {
      var friendValue = users[username].connections[i];
      var friendName = friendValue.substring(1);
      if (users[friendName] != undefined) {
        var friendId = users[friendName].id;
        var relation = tablePeople({'username': username,'to': friendValue}).count();
        info.links.push({"source":users[username].id,"target":friendId,"value":relation});
      }
    }
  }
  console.log(info);
  draw(info);
});

var dragstart = function(d){
  d3.select(this).classed("fixed", d.fixed = true);
}

/*
d3.json("data/demo.json", function(error, graph) {
  if (error) throw error;
  draw(graph);
});
*/

function processData(data) {
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
}

function getColor(obj) {
  if (obj[categories.CHEERLEADER] > 0) {
    return '#00FF00';
  } else {
    var value = obj[categories.CONTRIBUTION];
    var maxValue = maxValues[categories.CONTRIBUTION];
    var intensity = parseInt(150 + ((value / maxValue) * 100));
    var color = '#0000' + intensity.toString(16).toUpperCase();
    return color;
  }
}

function calculateSize(numMessages) {
  var diffSize = maxSize - minSize;
  var extraSize = (numMessages / diffSize) * diffSize;
  var size = minSize + extraSize
  return size;
}

var tooltip = d3.select("body")
  .append("div")
  .style("background-color", "#FFFFFF")
  .style("position", "absolute")
  .style("z-index", "10")
  .style("visibility", "hidden")
  .text("a simple tooltip");

function draw(graph) {
  force
      .nodes(graph.nodes)
      .links(graph.links)
      .start();

  var link = svg.selectAll(".link")
      .data(graph.links)
    .enter().append("line")
      .attr("class", "link")
      .style("stroke-width", function(d) { return Math.sqrt(d.value); });

  var node = svg.selectAll(".node")
      .data(graph.nodes)
      .enter().append("circle")
      .attr("class", "node")
      .attr("tooltip","Hola")
      .attr("r", function(d) { return calculateSize(d.total); })
      .style("fill", function(d) { return getColor(d); })
      .call(force.drag().on("dragstart", dragstart))
      .on("mouseover", function(d){tooltip.text(d.name); return tooltip.style("visibility", "visible");})
      .on("mousemove", function(d){return tooltip.style("top", (event.pageY-10)+"px").style("left",(event.pageX+10)+"px");})
      .on("mouseout", function(d){return tooltip.style("visibility", "hidden");})
      ;

  node.append("title")
      .text(function(d) { return d.name; });

  force.on("tick", function() {
    link.attr("x1", function(d) { return d.source.x; })
        .attr("y1", function(d) { return d.source.y; })
        .attr("x2", function(d) { return d.target.x; })
        .attr("y2", function(d) { return d.target.y; });

    node.attr("cx", function(d) { return d.x; })
        .attr("cy", function(d) { return d.y; });
  });
}

var d3Funcs = {};

d3Funcs.draw = draw;

module.exports = d3Funcs;
