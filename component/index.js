'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');

var ComponentGenerator = yeoman.generators.Base.extend({
    promptUser: function() {
        var done = this.async();
        var prompts = [
            {
                name: 'componentName',
                message: 'Qual é o nome do component?'
            }
        ];
        this.prompt(prompts, function (props) {
            this.component = props.componentName;
            done();
        }.bind(this));
    },
    generateComponent: function(){
        var context = {
            content: this.component,
            slug: this._.slugify(this.component)
        }

        var fileBase = context.slug;
        var scssFile  = "app/scss/components/_" + fileBase + ".scss";

        this.template("_component.scss", scssFile, context);

        var path = "app/scss/_components.scss",
            main = this.readFileAsString(path);
        this.write(path, main + '@import "components/'+fileBase+'";\n');
    }
});

module.exports = ComponentGenerator;
