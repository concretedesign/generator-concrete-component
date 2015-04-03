'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

String.prototype.toProperCase = function () {
  return this.replace(/-/g, ' ')
             .replace(/\w\S*/g, function(txt){ return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); })
             .replace(/\s/g, '');
};

module.exports = yeoman.generators.Base.extend({
  initializing: function () {
    this.pkg = require('../package.json');
  },

  prompting: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the beautiful ' + chalk.red('Concrete') + ' component generator!'
    ));

    var prompts = [{
      type: 'list',
      name: 'componentType',
      message: 'Where is your component going to live?',
      choices: ['layouts', 'pages', 'partials', 'ui'],
      default: 'ui'
    },
    {
      type    : 'input',
      name    : 'componentName',
      message : 'What is the component name (lowercase, spaces to hyphens please)?'
    },
    {
      type: 'confirm',
      name: 'addJade',
      message: 'Would you like to add a Jade template?',
      default: true
    }];

    this.prompt(prompts, function (props) {
      this.componentType = props.componentType;
      this.componentName = props.componentName;
      this.addJade = props.addJade;

      done();
    }.bind(this));
  },

  writing: {
    projectfiles: function () {
      if (this.addJade) {
        this.fs.copyTpl(
          this.templatePath('componentname.jade'),
          this.destinationPath('app/components/'+this.componentType+'/'+this.componentName+'/'+this.componentName+'.jade'),
          { componentName: this.componentName, componentNameCaps: this.componentName.toProperCase() }
        );
        this.fs.copyTpl(
          this.templatePath('componentname.jsx'),
          this.destinationPath('app/components/'+this.componentType+'/'+this.componentName+'/'+this.componentName+'.jsx'),
          { componentName: this.componentName, componentNameCaps: this.componentName.toProperCase() }
        );
      } else {
        this.fs.copyTpl(
          this.templatePath('componentname-nojade.jsx'),
          this.destinationPath('app/components/'+this.componentType+'/'+this.componentName+'/'+this.componentName+'.jsx'),
          { componentName: this.componentName, componentNameCaps: this.componentName.toProperCase() }
        );
      }

      this.fs.copyTpl(
        this.templatePath('componentname.scss'),
        this.destinationPath('app/components/'+this.componentType+'/'+this.componentName+'/'+this.componentName+'.scss'),
        { componentName: this.componentName, componentNameCaps: this.componentName.toProperCase() }
      );

      // Add Sass to app.scss
      var hook   = '// ===== '+this.componentType+' hook =====',
          path   = 'app/assets/styles/app.scss',
          file   = this.readFileAsString(path),
          insert = '@import "../../components/'+this.componentType+'/'+this.componentName+'/'+this.componentName+'"';

      if (file.indexOf(insert) === -1) {
        this.write(path, file.replace(hook, hook+'\n'+insert));
      }

    }
  }
});
