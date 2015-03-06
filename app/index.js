'use strict';
var path = require('path');
var util = require('util');
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

var CappenSiteGenerator = module.exports = function CappenSiteGenerator(args, options, config) {
    yeoman.generators.Base.apply(this, arguments);
    this.on('end', function () {
        this.installDependencies({ skipInstall: options['skip-install'] });
    });
    this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(CappenSiteGenerator, yeoman.generators.NamedBase);

CappenSiteGenerator.prototype.askFor = function askFor() {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay(
        'Welcome to the neat ' + chalk.red('Site Generator') + ' generator!'
    ));

    var prompts = [{
        name: 'siteName',
        message: 'Qual o nome do site?'
    }];

    this.prompt(prompts, function (props) {
        this.siteName = props.siteName;
        done();
    }.bind(this));
}
CappenSiteGenerator.prototype.app = function app() {
    this.mkdir("app");
    this.mkdir("app/classes");
    this.mkdir("app/fonts");
    this.mkdir("app/img");
    this.mkdir("app/paginas/home");
    this.mkdir("app/scripts/vendor");
    this.mkdir("app/scss");
};
CappenSiteGenerator.prototype.projectfiles = function projectfiles() {
    this.copy("_gitignore", ".gitignore");
    this.copy("_gruntfile.js", "Gruntfile.js");
    this.copy("_htaccess", "app/.htaccess");
    this.copy("_home.php", "app/paginas/home/home.php");
    this.copy("_App.php", "app/classes/App.php");
    this.copy("_main.js", "app/scripts/main.php");
    this.copy("_main.scss", "app/scss/main.scss");

    var context = {
        site_name: this.siteName
    };
    //console.log(context);
    this.template("_index.php", "app/index.php", context);
    this.template("_bower.json", "bower.json", context);
    this.template("_package.json", "package.json", context);
};
