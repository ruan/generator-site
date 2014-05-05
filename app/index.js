'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var chalk = require('chalk');


var CappenSiteGenerator = yeoman.generators.Base.extend({
	
  init: function () {
    this.pkg = require('../package.json');

    this.on('end', function () {
      if (!this.options['skip-install']) {
        this.installDependencies();
      }
    });
  },

  askFor: function () {
    var done = this.async();

    // have Yeoman greet the user
    this.log(this.yeoman);

    // replace it with a short and sweet description of your generator
    this.log(chalk.magenta('You\'re using the fantastic CappenSite generator.'));

    var prompts = [{
      name: 'appName',
      message: 'What is your app\'s name ?'
    },{
      type: 'confirm',
      name: 'someOption',
      message: 'Would you like to enable this option?',
      default: true
    }];

    this.prompt(prompts, function (props) {
      this.someOption = props.someOption;

      done();
    }.bind(this));
  },
  
	scaffoldFolders: function(){
	    this.mkdir("app");
	    this.mkdir("app/css");
	    this.mkdir("app/sections");
	    this.mkdir("build");
	},
	copyMainFiles: function(){
    this.copy("_footer.html", "app/footer.html");
    this.copy("_gruntfile.js", "Gruntfile.js");
    this.copy("_package.json", "package.json");
    this.copy("_main.css", "app/css/main.css");    
 
    var context = { 
        site_name: this.appName 
    };
 
    this.template("_header.html", "app/header.html", context);
	},
  generateDemoSection: function(){
    if (this.addDemoSection) {
          var done = this.async();
          this.invoke("onepage:section", {args: ["Demo Section"]}, function(){
              done();
          });
      } else {
          this.write( "app/menu.html", "");
      }
	},
	runNpm: function(){
    var done = this.async();
    this.npmInstall("", function(){
        console.log("\nEverything Setup !!!\n");
        done();
    });
	}
});

var SectionGenerator = yeoman.generators.NamedBase.extend({
	 generateSection: function(){
	    var context = {
	        content: this.name,
	        id: this._.classify(this.name)
	    }
	     
	    var fileBase = Date.now() + "_" + this._.underscored(this.name);
	  var htmlFile = "app/sections/" + fileBase + ".html";
	  var cssFile  = "app/css/" + fileBase + ".css"; 
	   
	  this.template("_section.html", htmlFile, context);
	  this.template("_section.css", cssFile, context);
	},
	 
	generateMenu: function(){
	    var menu = this.read("_menu.html");
	   
	  var t = '<a><%= name %></a>';
	  var files = this.expand("app/sections/*.html");
	   
	  for (var i = 0; i < files.length; i++) {
	      var name = this._.chain(files[i]).strRight("_").strLeftBack(".html").humanize().value();
	       
	      var context = {
	          name: name,
	          id: this._.classify(name)
	      };
	       
	      var link = this.engine(t, context);
	      menu = this.append(menu, "div.menu", link);
	  }
	   
	  this.write("app/menu.html", menu);
	}
});

module.exports = CappenSiteGenerator;
module.exports = SectionGenerator;