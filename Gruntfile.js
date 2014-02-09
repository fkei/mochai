(function () {

    var project = {
        dir: '',
        name: 'mochai'
    };

    module.exports = function (grunt) {
        // enviroment
        project.dir = grunt.file.findup(project.name);
        grunt.log.ok('[environment] project name:', project.name);
        grunt.log.ok('[environment] project directory:', project.dir);

        grunt.initConfig({
            pkg: grunt.file.readJSON('package.json'),
            clean: {
                src: ['docs']
            },
            jshint: {
                src: ['mochai.js'],
                options: {
                    jshintrc: '.jshintrc',
                    jshintignore: ".jshintignore"
                }
            },
            mkdir: {
                docs: {
                    options: {
                        mode: 0755,
                        create: ['docs']
                    }
                }
            },
            jsdoc : {
                dist : {
                    src: ['mochai.js'],
                    options: {
                        lenient: true,
                        recurse: true,
                        private: true,
                        destination: 'docs',
                        configure: '.jsdoc.json'
                    }
                }
            },
            uglify: {
                options: {
                    sourceMap: 'mochai.min.map'
                },
                default: {
                    files: {
                        'mochai.min.js': ['mochai.js']
                    }
                }
            },
            mocha_phantomjs: {
                no_output: {
                    options: {
                        'reporter': 'dot'
                    },
                    files: {
                        src: [
                            'spec/global.html',
                            'spec/requirejs.html'
                        ]
                    }
                }
            }
        });

        // These plugins provide necessary tasks.
        require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

        // task: build
        grunt.registerTask('build', [
            'jshint',
            'uglify:default'
        ]);

        // task: docs
        grunt.registerTask('docs', [
            'mkdir:docs',
            'jsdoc'
        ]);

        // task: test
        grunt.registerTask('test', [
            'mocha_phantomjs'
        ]);
        // task: defulat
        grunt.registerTask('default', [
            'clean',
            'build'
        ]);

    };
})(this);
