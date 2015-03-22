'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');
var chalk = require('chalk');

//var BleamGulpGenerator = yeoman.generators.Base.extend({
//});
//
//module.exports = BleamGulpGenerator;

var BleamGulpGenerator = module.exports = function BleamGulpGenerator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);

  this.on('end', function () {
    this.installDependencies({
      skipInstall: options['skip-install']
    });
  });

  this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(BleamGulpGenerator, yeoman.generators.NamedBase);

BleamGulpGenerator.prototype.askFor = function askFor() {
  var cb = this.async();

  var prompts = [{
    name: 'projName',
    message: 'What do you want to call your Project?'
  }];

  this.prompt(prompts, function (err, props) {
    if (err) {
      return this.emit('error', err);
    }

    this.projName = props.projName;

    cb();
  }.bind(this));
};


BleamGulpGenerator.prototype.app = function app() {
  // this.mkdir creates a directory in the directory the user is running your generator from
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

  // 'this.copy' then removes the _ and places the files to the user's root directory (BlogGenerator.prototype._dontRunMe.)
  this.copy('_package.json', 'package.json');
  this.copy('_bower.json', 'bower.json');

  this.template('index.html','app/index.html');
  this.template('_package.json', 'package.json');
  this.template('_bower.json', 'bower.json');
  this.template("_gulpfile.js", "gulpfile.js");
  this.template("_normalize.min.css", "app/css/normalize.min.css");
  this.template("_main.scss", "app/sass/main.scss");
  this.template("_.bowerrc", ".bowerrc");
  this.template("_app.js", "app/js/app.js");
  this.template("_modernizr-2.6.2.min.js", "app/js/vendor/modernizr-2.6.2.min.js");
  this.template("_jquery-1.11.1.min.js", "app/js/vendor/jquery-1.11.1.min.js");
};

BleamGulpGenerator.prototype.projectfiles = function projectfiles() {
  this.copy('editorconfig', '.editorconfig');
  this.copy('jshintrc', '.jshintrc');
};

BleamGulpGenerator.prototype.runtime = function runtime() {
  this.copy('bowerrc', '.bowerrc');
  this.copy('gitignore', '.gitignore');
};


//promptUser: function() {
//  var done = this.async();
//  // have Yeoman greet the user
//  console.log(this.yeoman);
//
//  var prompts = [{
//    name: 'appName',
//    message: 'Enter your project name?'
//  }
//  ];
//
//  this.prompt(prompts, function(props) {
//    this.appName = props.appName;
//    done();
//  }.bind(this));
//}

//// we create a method to create an app folder and copy our files there.
//createFolders: function() {
//  this.mkdir("app");
//  this.mkdir("app/fonts");
//  this.mkdir("app/img");
//  this.mkdir("app/includes");
//  this.mkdir("app/includes/partials");
//  this.mkdir("app/includes/partials/common");
//  this.mkdir("app/css");
//  this.mkdir("app/sass");
//  this.mkdir("app/sass/core");
//  this.mkdir("app/sass/partials");
//  this.mkdir("app/js");
//  this.mkdir("app/js/vendor");
//}
//
//copyFiles : function() {
//  this.copy('index.html','app/index.html');
//  this.copy('_package.json', 'package.json');
//  this.copy('_bower.json', 'bower.json');
//  this.copy("_gulpfile.js", "gulpfile.js");
//  this.copy("_normalize.min.css", "app/css/normalize.min.css");
//  this.copy("_main.scss", "app/sass/main.scss");
//  this.copy("_.bowerrc", ".bowerrc");
//  this.copy("_app.js", "app/js/app.js");
//  this.copy("_modernizr-2.6.2.min.js", "app/js/vendor/modernizr-2.6.2.min.js");
//  this.copy("_jquery-1.11.1.min.js", "app/js/vendor/jquery-1.11.1.min.js");
//}
//
//
//// we need to initiate the node and bower tasks
//runNpm: function() {
//  console.log("\n Done loading files! \nInstalling Node modules and Bower packages...\n");
//  this.npmInstall("", function() {
//    console.log("\n Done installing node modules!\n Run 'npm start' to build and serve the project");
//  });
//  this.bowerInstall("", function() {
//    console.log("\n  Done installing bower Packages\n");
//  });
//}
