module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        concat: {
            js: {
                src: [
                    'bower_components/jquery/dist/jquery.js',
                    'bower_components/bootstrap-sass/dist/js/bootstrap.js',
                    'bower_components/html2canvas/build/html2canvas.js',
                    'bower_components/medium-editor/dist/js/medium-editor.js',
                    'assets/js/plugins.js',
                    'assets/js/main.js',
                ],
                dest: 'assets/js/all.js',
            },
            css: {
                src: [
                    'bower_components/medium-editor/dist/css/medium-editor.css',
                    'bower_components/medium-editor/dist/css/themes/default.css',
                    'assets/css/styles.css',
                    ],
                dest: 'assets/css/all.css',
            }
        },

        uglify: {
            build: {
                src: 'assets/js/all.js',
                dest: 'assets/js/all.min.js'
            }
        },

        sass: {
            dist: {
                options: {
                    style: 'compressed'
                },
                files: {
                    'assets/css/styles.css': 'assets/scss/styles.scss'
                }
            }
        },

        watch: {
            options: {
                livereload: true,
            },
            scripts: {
                files: ['assets/js/*.js'],
                tasks: ['concat:js', 'uglify'],
                options: {
                    spawn: false,
                },
            },
            scss: {
                files: ['assets/scss/*.scss'],
                tasks: ['sass', 'concat:css'],
                options: {
                    spawn: false,
                }
            },
        },
        connect: {
            server: {
                options: {
                    port: 9000,
                    useAvailablePort: true
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');

    grunt.registerTask('default', ['sass', 'concat', 'uglify']);
    grunt.registerTask('serve', ['connect','watch']);

};
