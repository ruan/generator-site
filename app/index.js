'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var chalk = require('chalk');

var CappenSiteGenerator = yeoman.generators.Base.extend({
    promptUser: function() {
        var done = this.async();
        var prompts = [{
            name: 'appName',
            message: 'Qual é o nome do site?'
        }];
        this.prompt(prompts, function (props) {
            this.appName = props.appName;
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
        this.copy("_gitignore", ".gitignore");
        this.copy("_gruntfile.js", "Gruntfile.js");
        this.copy("_htaccess", "app/.htaccess");
        this.copy("_index.php", "app/index.php");
        this.copy("_home.php", "app/paginas/home/home.php");
        this.copy("_App.php", "app/classes/App.php");
        this.copy("_main.js", "app/scripts/main.php");
        this.copy("_main.scss", "app/scss/main.scss");

        var context = {
            site_name: this.appName
        };

        this.template("_index.php", "app/index.php", context);
        this.template("_bower.json", "bower.json", context);
        this.template("_package.json", "package.json", context);
    }
});

module.exports = CappenSiteGenerator;
