module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        typescript: {
            base: {
                src: ['app/ts/**/*.ts'],
                dest: 'app/app-concatenated.js',
                options: {
                    module: 'amd', //or commonjs 
                    target: 'es5', //or es3 
                    sourceMap: true,
                    declaration: true
                }
            }
        },
        less: {
            // production config is also available
            development: {
                options: {
                    // Specifies directories to scan for @import directives when parsing. 
                    // Default value is the directory of the source, which is probably what you want.
                    paths: ["app/less/"],
                },
                files: {
                    // compilation.css  :  source.less
                    "app/less/compiledCss/general.css": "app/less/general.less",
                    "app/less/compiledCss/tasks.css": "app/less/tasks.less"
                }
            },
        },
        concat: {
            dist: {
                src: ['app/less/compiledCss/*.css'],
                dest: 'app/app-concatenated.css',
            },
        }
    });

    grunt.loadNpmTasks('grunt-typescript');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-concat');

    // Default task(s).
    grunt.registerTask('build', ['typescript', 'less', 'concat'])
    grunt.registerTask('default', ['build']);

};