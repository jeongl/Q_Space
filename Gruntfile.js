'use strict';

module.exports = function (grunt) {

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-express-server');
  grunt.loadNpmTasks('grunt-mongoimport');
  grunt.loadNpmTasks('grunt-mocha-cov');
  grunt.loadNpmTasks('grunt-simple-mocha');
  grunt.loadNpmTasks('grunt-mongo-drop');

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
    simplemocha: {
      test:{
        src:['test/*_Test.js'],
        options:{
          reporter: 'spec',
          slow: 200,
          timeout: 1000,
          node_env: 'test'
        }
      }
    },
    mochacov: {
      coverage: {
        options: {
          reporter: 'mocha-term-cov-reporter',
          coverage: true
        }
      },
      coveralls: {
        options: {
          coveralls: {
            serviceName: 'travis-ci'
          }
        }
      },
      unit: {
        options: {
          reporter: 'spec',
          require: ['chai']
        }
      },
      html: {
        options: {
          reporter: 'html-cov',
          require: ['chai']
        }
      },
      options: {
        files: 'test/*.js',
        ui: 'bdd',
        colors: true
      }
    },
    mongo_drop: {
      test: {
        'uri' : 'mongodb://localhost/quoteSpace-development'
      }
    },
  });

  grunt.registerTask('default', [ 'test', 'express:dev', 'watch:development']);
  grunt.registerTask('test', ['mongo_drop', 'simplemocha']);
};