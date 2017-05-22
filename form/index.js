'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');

var FormGenerator = yeoman.generators.Base.extend({
    generateForm: function(){
        this.fs.copy(
            this.templatePath('**'),
            this.destinationPath('app/')
        )
        var path = "app/scss/_components.scss",
            main = this.readFileAsString(path);
        this.write(path, main + '@import "components/form";\n');

        var path = "app/scss/_layouts.scss",
            main = this.readFileAsString(path);
        this.write(path, main + '@import "layouts/form";\n');

        var path = "app/scss/_mixins.scss",
            main = this.readFileAsString(path),
            files = '@import "mixins/form";\n';
            files += '@import "mixins/form-message";\n';
            files += '@import "mixins/input-checkbox";\n';
            files += '@import "mixins/input-file";\n';
            files += '@import "mixins/input-radio";\n';
            files += '@import "mixins/input-submit";\n';
            files += '@import "mixins/input-text";\n';
            files += '@import "mixins/input-textarea";\n';
            files += '@import "mixins/select";\n';

        this.write(path, main + files);
    },
    installPlugins: function(){
        this.bowerInstall( ['select2','moment','jquery.maskedinput','parsleyjs'],{save:true});
    }
});

module.exports = FormGenerator;
