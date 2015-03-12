'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var chalk = require('chalk');

var CappenSiteGenerator = yeoman.generators.Base.extend({
    promptUser: function() {
        var done = this.async();
        var prompts = [
            {
                name: 'appName',
                message: 'Qual é o nome do site?'
            },
            {
                type: 'checkbox',
                name: 'plugins',
                message: 'Quais plugins você irá utilizar?',
                choices: [
                    {
                        name: "Angular",
                        value: "angular",
                    },
                    {
                        name: "Angular Route",
                        value: "angular-route"
                    },
                    {
                        name: "Angular Sanitize",
                        value: "angular-sanitize"
                    },
                    {
                        name: "Angular Animate",
                        value: "angular-animate"
                    },
                    {
                        name: "Angular Resource",
                        value: "angular-resource"
                    },
                    {
                        name: "Greensock JS",
                        value: "greensock"
                    },
                    {
                        name: "Owl carrosel",
                        value: "OwlCarousel"
                    },
                    {
                        name: "Owl carrosel 2",
                        value: "owl-carousel2"
                    }
                ]
            }
        ];
        this.prompt(prompts, function (props) {
            this.appName = props.appName;
            this.plugins = props.plugins;
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
        this.bulkCopy("_gruntfile.js", "Gruntfile.js");
        this.copy("_htaccess", "app/.htaccess");
        this.copy("_index.php", "app/index.php");
        this.copy("_home.php", "app/paginas/home/home.php");
        this.copy("_App.php", "app/classes/App.php");
        this.copy("_main.js", "app/scripts/main.php");
        this.copy("_home.scss", "app/scss/home.scss");
        this.copy("_main.scss", "app/scss/main.scss");

        var context = {
            site_name: this.appName,
            id:this._.underscored(this.appName).replace(/_/g,'-')
        };

        this.template("_index.php", "app/index.php", context);
        this.template("_bower.json", "bower.json", context);
        this.template("_package.json", "package.json", context);
    },
    installPlugins: function(){
        this.bowerInstall(this.plugins,{save:true});
        this.npmInstall();
    }
});

module.exports = CappenSiteGenerator;
