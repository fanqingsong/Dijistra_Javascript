/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    // Metadata.
    meta: {
      version: '0.1.0'
    },
    banner: '/*! PROJECT_NAME - v<%= meta.version %> - ' +
      '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
      '* http://PROJECT_WEBSITE/\n' +
      '* Copyright (c) <%= grunt.template.today("yyyy") %> ' +
      'YOUR_NAME; Licensed MIT */\n',
    // Task configuration.
    uglify: {
      options: {
        banner: '<%= banner %>'
      },
      dist: {
        src: 'src/dijstra_core.js',
        dest: 'build/dijstra_core_min.js'
      }
    },
    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: false,
        noarg: true,
        sub: true,
        undef: true,
        unused: true,
        boss: true,
        eqnull: true,
        globals: {
          console: true,
          window:true,
        }
      },
      gruntfile: {
        src: 'Gruntfile.js'
      },
      lib_test: {
        src: ['src/*.js']
      }
    }
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');

  // Default task.
  grunt.registerTask('default', ['jshint', 'uglify']);

};
