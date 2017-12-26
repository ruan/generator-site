/*global module:false*/
module.exports = function (grunt) {
    require('load-grunt-tasks')(grunt, { config: 'package' });
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
                tasks: ['wiredep:app'],
                options: {
                    livereload: true
                }
            },
            js: {
                files: ['<%= config.app %>/scripts/**/*.js'],
                tasks: ['fileblocks:app'],
                options: {
                    livereload: true
                }
            },
            gruntfile: {
                files: ['Gruntfile.js']
            },
            sourceSass: {
                files: ['<%= config.app %>/scss/{,**/}*.{scss,sass}'],
              tasks: ['sass_globbing', 'sass:app'],
                options: {
                    livereload: true
                }
            }
        },

        fileblocks: {
            app: {
                src: '<%= config.app %>/index.php',
                blocks: {
                    'app': { src: ['scripts/vendor/*.js', 'scripts/main.js'], cwd: '<%= config.app %>/', prefix: '<?php $app->getBaseUrl(); ?>', rebuild: true }
                }
            },
            preBuild: {
                src: '<%= config.build %>/index.php',
                blocks: {
                    'app': { src: ['scripts/vendor/*.js', 'scripts/main.js'], cwd: '<%= config.app %>/', prefix: '../<%= config.app %>/', rebuild: true }
                }
            },
            build: {
                src: '<%= config.build %>/index.php',
                options: {
                    templatesFn: {
                        js: function (file) {
                            return file + '?' + Math.round(Math.random() * (9999 - 1000) + 1000);
                        },
                        css: function (file) {
                            return file + '?' + Math.round(Math.random() * (9999 - 1000) + 1000);
                        }
                    }
                },
                blocks: {
                    'css': { src: ['styles/*.css', '!styles/main.css', 'styles/main.css'], cwd: '<%= config.build %>/', prefix: '<?php $app->getBaseUrl(); ?>', rebuild: true },
                    'js': { src: ['scripts/vendor/*.js', 'scripts/*.js', '!scripts/main.js', 'scripts/main.js'], cwd: '<%= config.build %>/', prefix: '<?php $app->getBaseUrl(); ?>', rebuild: true }
                }
            },
        },

        processhtml: {
            options: {
                commentMarker: 'process',
            },
            build: {
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
                    dot: true,
                    src: [
                        '.tmp/*',
                        '<%= config.build %>/*',
                        '!<%= config.build %>/.git*'
                    ]
                }]
            }
        },

        sass_globbing: {
            my_target: {
                files: {
                    '<%= config.app %>/scss/_mixins.scss': ['<%= config.app %>/scss/mixins/**/*.scss'],
                    '<%= config.app %>/scss/_components.scss': ['<%= config.app %>/scss/components/**/*.scss'],
                    '<%= config.app %>/scss/_layouts.scss': ['<%= config.app %>/scss/layouts/**/*.scss']
                }
            },
            options: {
                signature: false,
                useSingleQuotes: false
            }
        },

        sass: {
            app: {
                files: {
                    '<%= config.app %>/styles/main.css': '<%= config.app %>/scss/main.scss'
                },
                options: {
                    sourceMap: true,
                    outputStyle: 'expanded'
                }
            },
            build: {
                files: {
                    '<%= config.build %>/styles/main.css': '<%= config.app %>/scss/main.scss'
                },
                options: {
                    sourceMap: false,
                    outputStyle: 'compressed'
                }
            }
        },

        postcss: {
            options: {
                map: false,
                processors: [
                    require('autoprefixer')
                ]
            },
            build: {
                src: '<%= config.build %>/styles/main.css'
            }
        },

        // Automatically inject Bower components into the HTML file
        wiredep: {
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
                    '<%= config.build %>/index.php',
                    '<%= config.build %>/scss/{,*/}*.scss'
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
            html: '<%= config.build %>/index.php'
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
                mangle: false
            }
        },

        // Copies remaining files to places other tasks can use
        copy: {
            app: {
                files: [{
                    expand: true,
                    flatten: true,
                    src: ['bower_components/font-awesome/fonts/*'],
                    dest: '<%= config.app %>/fonts'
                }]
            },
            build: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '<%= config.app %>',
                    dest: '<%= config.build %>',
                    src: [
                        '**',
                        '!scss/**',
                        '!scripts/**'
                    ]
                }]
            }
        },

        // Generates a custom Modernizr build that includes only the tests you
        // reference in your app
        modernizr: {
            build: {
                devFile: 'bower_components/modernizr/modernizr.js',
                dest: '<%= config.build %>/scripts/vendor/modernizr.js',
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
                'wiredep:app'
            ],
            build: [
                'fileblocks:preBuild',
                'wiredep:build'
            ]
        }
    });

    grunt.registerTask('app', function () {
        grunt.task.run([
            'clean:app',
            'concurrent:app',
            'sass_globbing',
            'sass:app',
            'copy:app',
            'watch'
        ]);
    });

    grunt.registerTask('build', function () {
        grunt.task.run([
            'clean:build',
            'copy:build',
            'concurrent:build',
            'sass:build',
            'postcss:build',
            'useminPrepare',
            'usemin',
            'concat',
            'cssmin',
            'uglify',
            'modernizr',
            'processhtml:build',
            'fileblocks:build'
        ]);
    });
};
