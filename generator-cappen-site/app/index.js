'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var chalk = require('chalk');

var OnepageGenerator = yeoman.generators.Base.extend({
    promptUser: function() {
        var done = this.async();

        // have Yeoman greet the user
        console.log(this.yeoman);

        var prompts = [{
            name: 'appName',
            message: 'What is your app\'s name ?'
        },{
            type: 'confirm',
            name: 'addDemoSection',
            message: 'Would you like to generate a demo section ?',
            default: true
        }];

        this.prompt(prompts, function (props) {
            this.appName = props.appName;
            this.addDemoSection = props.addDemoSection;

            done();
        }.bind(this));
    },
    scaffoldFolders: function(){
        this.mkdir("app");
        this.mkdir("app/classes");
        this.mkdir("app/fonts");
        this.mkdir("app/img");
        this.mkdir("app/paginas/home");
        this.mkdir("app/scripts/vendor");
        this.mkdir("app/scss");
    },
    copyMainFiles: function(){
        this.copy("_.gitignore", ".gitignore");
        this.copy("_gruntfile.js", "Gruntfile.js");
        this.copy("_package.json", "package.json");
        this.copy("_bower.json", "bower.json");
        this.copy("_.htaccess", "app/.htaccess");
        this.copy("_index.php", "app/index.php");
        this.copy("_home.php", "app/paginas/home/home.php");
        this.copy("_App.php", "app/classes/App.php");
        this.copy("_main.js", "app/scripts/main.php");
        this.copy("_main.scss", "app/scss/main.scss");

        var context = {
            site_name: this.appName
        };

        this.template("_index.php", "app/index.php", context);
    },
    runNpm: function(){
        var done = this.async();
        this.npmInstall("", function(){
            console.log("\nEverything Setup !!!\n");
            done();
        });
    }
});

module.exports = OnepageGenerator;
