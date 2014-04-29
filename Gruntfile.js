'use strict';

module.exports = function (grunt) {

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-express-server');

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    express: {
      options: {
        // Override defaults here
      },
      dev: {
        options: {
          script: 'server.js',
          node_env: 'development'
        }
      },
      prod: {
        options: {
          script: 'server.js',
          node_env: 'production'
        }
      }
    },
    watch: {
      development: {
        files: ['app/**/*.js'],
        options: {
          livereload: true
        },
//        tasks: ['express:dev']
      },
      dev: {
        files: ['app/js/model/**/*'],
        tasks: ['server']
      },
      backbone: {
        files: ['app/js/backbone/**/*.js'],
        tasks: ['build:dev', 'express:dev']
      },
      notest: {
        files: ['server.js', 'test/**.js', 'app/**/*', 'api/**/*'],
        options: {
          livereload: true
        },
        tasks: ['build:dev']
      }
    }
  });

  grunt.registerTask('default', ['express:dev', 'watch:development']);
};