'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');

var PaginaGenerator = yeoman.generators.NamedBase.extend({
    generatePagina: function(){
        var context = {
            content: this.name,
            id: this._.slugify(this.name)
        }

        var fileBase = this._.slugify(this.name);
        var phpFile = "app/paginas/" + fileBase + '/' + fileBase +".php";
        var scssFile  = "app/scss/_" + fileBase + ".scss";

        this.template("_pagina.php", phpFile, context);
        this.template("_pagina.scss", scssFile, context);

        var path = "app/scss/main.scss",
            main = this.readFileAsString(path);
        this.write(path, main + '@import "'+fileBase+'";\n');
    },
});

module.exports = PaginaGenerator;
