'use strict';

module.exports = function (grunt) {

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-express-server');
  grunt.loadNpmTasks('grunt-mongoimport');

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
        files: ['app/**/*.js', 'server.js', 'api/**/*.js'],
        options: {
          livereload: true,
          spawn: false
        },
        tasks: ['express:dev']
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
    },
    mongoimport: {
      options: {
        db : 'quoteSpace-development',
        //optional
        host : 'localhost',
        //port: '27017',
        //username : 'username',
        //password : 'password',
        //stopOnError : false,
        collections : [
          {
            name : 'quotes',
//            type : 'json',
//            file : 'db/seeds/users.json',
//            jsonArray : true,  //optional
//            upsert : true,  //optional
            drop : true  //optional
          },
          {
            name : 'meetings',
            type :'json',
            file : 'db/seeds/meetings.json',
            jsonArray : true,
            upsert : true,
            drop : true
          }
        ]
      }
    },
  });

  grunt.registerTask('default', ['express:dev', 'watch:development']);
};