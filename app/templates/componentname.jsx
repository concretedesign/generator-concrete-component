var React = require('react');
var jade = require('react-jade');

var template = jade.compileFile(__dirname + '/<%= componentName %>.jade');

var <%= componentNameCaps %> = React.createClass({

  render: function () {
    return template({local: 'values'});
  }
});

module.exports = <%= componentNameCaps %>;