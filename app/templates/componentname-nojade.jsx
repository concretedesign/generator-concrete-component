var React = require('react');

var <%= componentNameCaps %> = React.createClass({

  render: function () {
    return (
      <div className="<%= componentName %>">
        <h1><%= componentNameCaps %></h1>
      </div>
    );
  }
});

module.exports = <%= componentNameCaps %>;