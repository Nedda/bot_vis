var React = require("react");
var Paper = require("/bower_components/paper/dist/paper-full");

class Page extends React.Component {

  render() {
    return(
      <div className="content">
        <section>
          This is a section.
        </section>
      </div>
    );
  }

}

module.exports = Page;
