module.exports = function( grunt ) {
    grunt.initConfig( {
        browserify: {
            lib: {
                src: [],
                dest: 'public/lib.js',
                options: {
                    require: [ 'underscore', 'd3', 'jquery' ]
                }
            },

            dev: {
                src: [ 'src/**/*.js' ],
                dest: 'public/main.js',
                options: {
                    external: [ 'underscore', 'd3', 'jquery' ]
                }
            }
        },

        sass: {
            dist: {
                files: {
                    'public/style.css': 'style/index.scss'
                }
            }
        },

        watch: {
            dev: {
                files: [ 'src/**/*.js' ],
                tasks: [ 'browserify:dev' ]
            },

            sass: {
                files: [ 'style/**/*.scss' ],
                tasks: [ 'sass' ]
            }
        }
    } );

    grunt.loadNpmTasks( 'grunt-browserify' );
    grunt.loadNpmTasks( 'grunt-contrib-watch' );
    grunt.loadNpmTasks( 'grunt-contrib-sass' );

    grunt.registerTask( 'default', [ 'browserify', 'sass:dist', 'watch' ] );
}
