/*global module:false*/
module.exports = function(grunt) {

    require('load-grunt-tasks')(grunt , {config: 'package'});
    require('time-grunt')(grunt);

    var config = {
        app: 'app',
        build: 'build'
    };

    grunt.initConfig({

        config: config,

        watch: {
            bower: {
                files: ['bower.json'],
                tasks: ['bowerInstall:app']
            },
            js: {
                files: ['<%= config.app %>/scripts/{,**/}*.js'],
                tasks: ['jshint','fileblocks:app'],
            },
            gruntfile: {
                files: ['Gruntfile.js']
            },
            sass: {
                files: ['<%= config.app %>/scss/{,*/}*.{scss,sass}'],
                tasks: ['compass:app']
            }
        },

        fileblocks: {
            app: {
                src: '<%= config.app %>/index.php',
                blocks: {
                    'app': { src: ['scripts/vendor/*.js','scripts/models/*.js','scripts/app.js','scripts/directives/range.js','scripts/directives/*.js','scripts/services/*.js','scripts/controllers/*.js','scripts/main.js'], cwd: '<%= config.app %>/' , prefix: '<?php $app->getBaseUrl(); ?>' , rebuild:true}
                }
            },
            build: {
                src: '<%= config.app %>/index.php',
                blocks: {
                    'app': { src: ['scripts/vendor/*.js','scripts/models/*.js','scripts/app.js','scripts/directives/range.js','scripts/directives/*.js','scripts/services/*.js','scripts/controllers/*.js','scripts/main.js'], cwd: '<%= config.app %>/' , prefix: '' , rebuild:true}
                }
            }
        },

        processhtml: {
            options:{
                commentMarker: 'process'
            },
            build:{
                files: [{
                    expand: true,
                    cwd: '<%= config.build %>/',
                    src: ['index.php'],
                    dest: '<%= config.build %>/',
                    ext: '.php'
                }]
            }
        },

        // Empties folders to start fresh
        clean: {
            app: '.tmp/*',
            build: {
                files: [{
                    dot:true,
                    src: [
                        '.tmp/*',
                        '<%= config.build %>/*',
                        '!<%= config.build %>/.git*'
                    ]
                }]
            }
        },

        // Make sure code styles are up to par and there are no obvious mistakes
        jshint: {
            options: {
                reporter: require('jshint-stylish')
            },
            all: [
                'Gruntfile.js',
                '<%= config.app %>/scripts/{,**/}*.js',
                '!<%= config.app %>/scripts/{,vendor/}*.js'
            ]
        },

        compass: {
            app: {
                options: {
                    sassDir: '<%= config.app %>/scss',
                    cssDir: '.tmp/styles',
                    imagesDir: '<%= config.app %>/img',
                    fontsDir: '<%= config.app %>/fonts',
                    outputStyle : 'expanded',
                    require: ['rgbapng','breakpoint','animation'],
                    relativeAssets: true
                }
            },
            build: {
                options: {
                    sassDir: '<%= config.app %>/scss',
                    cssDir: '<%= config.build %>/styles',
                    imagesDir: '<%= config.build %>/img',
                    fontsDir: '<%= config.build %>/fonts',
                    outputStyle : 'compressed',
                    require: ['rgbapng','breakpoint','animation'],
                    relativeAssets: true
                }
            }
        },

        // Automatically inject Bower components into the HTML file
        bowerInstall: {
            app: {
                src: [
                    '<%= config.app %>/index.php',
                    '<%= config.app %>/scss/{,*/}*.scss'
                ],
                fileTypes: {
                    html: {
                        replace: {
                            js: '<script src="<?php $app->getBaseUrl()?>{{filePath}}"></script>',
                            css: '<link rel="stylesheet" href="<?php $app->getBaseUrl()?>{{filePath}}"/>'
                        }
                    }
                }
            },
            build: {
                src: [
                    '<%= config.app %>/index.php',
                    '<%= config.app %>/scss/{,*/}*.scss'
                ]
            }
        },

        // Reads HTML for usemin blocks to enable smart builds that automatically
        // concat, minify and revision files. Creates configurations in memory so
        // additional tasks can operate on them
        useminPrepare: {
            options: {
                dest: '<%= config.build %>'
            },
            html: '<%= config.app %>/index.php'
        },

        // Performs rewrites based on rev and the useminPrepare configuration
        usemin: {
            options: {
                assetsDirs: ['<%= config.build %>', '<%= config.build %>/img']
            },
            html: ['<%= config.build %>/index.php'],
            css: ['<%= config.build %>/styles/{,*/}*.css']
        },
        uglify: {
            options: {
                report: 'min',
                mangle: false
            }
        },
        // The following *-min tasks produce minified files in the dist folder
        imagemin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= config.app %>/img',
                    src: '{,**/}*.{gif,jpeg,jpg,png}',
                    dest: '<%= config.build %>/img'
                }]
            }
        },

        // Copies remaining files to places other tasks can use
        copy: {
            build: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '<%= config.app %>',
                    dest: '<%= config.build %>',
                    src: [
                        '*.{ico,png,jpg,gif}',
                        '.htaccess',
                        'img/{,**/}*.webp',
                        '{,**/}*.{html,php}',
                        'fonts/{,*/}*.*'
                    ]
                }]
            }
        },

        // Generates a custom Modernizr build that includes only the tests you
        // reference in your app
        modernizr: {
            build: {
                devFile: 'bower_components/modernizr/modernizr.js',
                outputFile: '<%= config.build %>/scripts/vendor/modernizr.js',
                files: {
                    src: [
                        '<%= config.build %>/scripts/{,**/}*.js',
                        '<%= config.build %>/styles/{,*/}*.css',
                        '!<%= config.build %>/scripts/vendor/*'
                    ]
                },
                uglify: true
            }
        },

        // Run some tasks in parallel to speed up build process
        concurrent: {
            app: [
                'fileblocks:app',
                'jshint',
                'bowerInstall:app'
            ],
            build: [
                'fileblocks:build',
                'imagemin',
                'copy:build',
                'bowerInstall:build'
            ]
        }
    });

    grunt.registerTask('app', function () {
        grunt.task.run([
            'clean:app',
            'concurrent:app',
            'compass:app',
            'watch'
        ]);
    });

    grunt.registerTask('build', function(){
        grunt.task.run([
            'clean:build',
            'concurrent:build',
            'compass:build',
            'useminPrepare',
            'usemin',
            'concat',
            'cssmin',
            'uglify',
            'modernizr',
            'processhtml:build'
        ]);
    });

};
