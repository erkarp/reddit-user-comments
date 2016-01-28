module.exports = function(grunt) {

	function ftpTask(files) {
		return {
			options: {
					host: "wdsclient.com",
					authKey: "server",
					dest: "/public_html/em/code"
					/* Reminder: also change .htaccess and <base> in index head */
			},
			files: [{
				expand: true,
				cwd: '.',
				src: [ files ]
			}]
		}
	};

	grunt.config.init({
		sass: {
			options: {
				sourceMap: true
			},
			dist: {
				files: {
					'stylesheets/style.css': 'sass/style.scss'
				}
			}
		},
		concat: {
	    options: {
	      separator: grunt.util.linefeed,
	    },
	    dist: {
	      src: [
					'app/config.js',
					'app/error/*.js',
					'app/comments/*.js',
					'app/subreddits/*.js',
					'app/main/*.js',
					'app/chart/*.js',
					'app/graph/*.js'
				],
	      dest: 'script.js'
	    }
	  },
		karma: {
		  unit: {
		    options: {
		      frameworks: ['jasmine'],
		      singleRun: true,
		      browsers: ['PhantomJS'],
		      files: [
		        'node_modules/angular/angular.js',
		        'node_modules/angular-mocks/angular-mocks.js',
						'node_modules/angular-route/angular-route.js',
		        'script.js',
						'tests/reddit-user-comments.tests.js'
		      ]
		    }
		  }
		},
		ftp_push: {
			css: ftpTask([
				'stylesheets/style.css'
			]),
			html: ftpTask([
				'**.html', 'app/**/*.html'
			]),
			js: ftpTask([
				'script.js'
			])
		}
	});

	grunt.loadNpmTasks('grunt-ftp-push');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-sass');
	grunt.loadNpmTasks('grunt-karma');

	grunt.registerTask('html', ['ftp_push:html']);
	grunt.registerTask('css',  ['sass', 'ftp_push:css']);
	grunt.registerTask('js',   ['concat', 'ftp_push:js']);
	grunt.registerTask('test', ['concat','karma']);

	grunt.registerTask('default', ['js', 'css', 'html']);
};
