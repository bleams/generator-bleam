'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');
var chalk = require('chalk');


var BleamGulpGenerator = yeoman.generators.Base.extend({
});

module.exports = BleamGulpGenerator;

promptUser: function() {
  var done = this.async();
  // have Yeoman greet the user
  console.log(this.yeoman);

  var prompts = [{
    name: 'appName',
    message: 'Enter your project name?'
  }
  ];

  this.prompt(prompts, function(props) {
    this.appName = props.appName;
    done();
  }.bind(this));
}

// we create a method to create an app folder and copy our files there.
createFolders: function() {
  this.mkdir("app");
  this.mkdir("app/fonts");
  this.mkdir("app/img");
  this.mkdir("app/includes");
  this.mkdir("app/includes/partials");
  this.mkdir("app/includes/partials/common");
  this.mkdir("app/css");
  this.mkdir("app/sass");
  this.mkdir("app/sass/core");
  this.mkdir("app/sass/partials");
  this.mkdir("app/js");
  this.mkdir("app/js/vendor");
}

copyFiles : function() {
  this.copy('index.html','app/index.html');
  this.copy('_package.json', 'package.json');
  this.copy('_bower.json', 'bower.json');
  this.copy("_gulpfile.js", "gulpfile.js");
  this.copy("_normalize.min.css", "app/css/normalize.min.css");
  this.copy("_main.scss", "app/sass/main.scss");
  this.copy("_.bowerrc", ".bowerrc");
  this.copy("_app.js", "app/js/app.js");
  this.copy("_modernizr-2.6.2.min.js", "app/js/vendor/modernizr-2.6.2.min.js");
  this.copy("_jquery-1.11.1.min.js", "app/js/vendor/jquery-1.11.1.min.js");
}


// we need to initiate the node and bower tasks
runNpm: function() {
  console.log("\n Done loading files! \nInstalling Node modules and Bower packages...\n");
  this.npmInstall("", function() {
    console.log("\n Done installing node modules!\n Run 'npm start' to build and serve the project");
  });
  this.bowerInstall("", function() {
    console.log("\n  Done installing bower Packages\n");
  });
}
