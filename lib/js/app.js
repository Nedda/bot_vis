var React = require('react');
var Bot = require('./components/Bot');

class App extends React.Component {

  render() {
    return (
      <div>
        <div class="header">
          <h1> soemthing </h1>
        </div>
        <footer>
          M. Bernales
        </footer>
      </div>
    );
  }

}

React.render(<App/>, document.getElementById('app'));
