'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');

var PaginaGenerator = yeoman.generators.NamedBase.extend({
    generatePagina: function(){
        var context = {
            content: this.name,
            id: this._.underscored(this.name).replace(/_/g,'-')
        }

        var fileBase = this._.underscored(this.name);
        fileBase = fileBase.replace(/_/g,'-');
        var phpFile = "app/paginas/" + fileBase + '/' + fileBase +".php";
        var scssFile  = "app/scss/_" + fileBase + ".scss";

        this.template("_pagina.php", phpFile, context);
        this.template("_pagina.scss", scssFile, context);

        //var mainscss = this.read("_pagina.scss");
        //console.log(mainscss);
        var path = "app/scss/main.scss",
            main = this.readFileAsString(path);
        this.write(path, main + '\n@import "'+fileBase+'";');
        //this.writeFileFromString("@import" , path);
    },
});

module.exports = PaginaGenerator;
