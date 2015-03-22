'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');
var chalk = require('chalk');
var _ = require('lodash');

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
