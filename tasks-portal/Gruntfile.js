module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        typescript: {
            base: {
                src: ['app/ts/**/*.ts'],
                dest: 'app/ts-concatenated.js',
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
            css: {
                src: ['app/less/compiledCss/*.css'],
                dest: 'app/app-concatenated.css',
            },
            jsapp: {
                src: ['app/ts-concatenated.js', 'app/components/version/version.js', 'app/components/version/version-directive.js', 'app/components/version/interpolate-filter.js'],
                dest: 'app/app-concatenated.js',
            },
            jsvendors: {
                src: ['app/bower_components/jquery/dist/jquery.min.js', 
                    'app/bower_components/bootstrap/dist/js/bootstrap.min.js',
                    'app/bower_components/angular/angular.js', 
                    'app/bower_components/angular-route/angular-route.js'],
                dest: 'app/vendors-concatenated.js',
            }
        }
    });

    grunt.loadNpmTasks('grunt-typescript');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-concat');

    // Default task(s).
    grunt.registerTask('build', ['typescript', 'less', 'concat'])
    grunt.registerTask('default', ['build']);

};