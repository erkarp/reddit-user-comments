module.exports = function(grunt) {
//require('load-grunt-tasks')(grunt); // npm install --save-dev load-grunt-tasks

	function ftpTask(files) {
		return {
			options: {
					host: "wdsclient.com",
					dest: "/public_html/em/code/",
					authKey: "server",
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
		karma: {
		  unit: {
		    options: {
		      frameworks: ['jasmine'],
		      singleRun: true,
		      browsers: ['PhantomJS'],
		      files: [
		        'node_modules/angular/angular.js',
		        'node_modules/angular-mocks/angular-mocks.js',
		        'js/**/*.js'
		      ]
		    }
		  }
		},
		ftp_push: {
			all: ftpTask([
				"**.html",
				"stylesheets/style.css",
				"js/**"
			]),
			css: ftpTask([
				'stylesheets/style.css'
			]),
			html: ftpTask([
				'**.html'
			]),
			js: ftpTask([
				'js/<%= path %>/**'
			])
		}
	});

	grunt.loadNpmTasks('grunt-sass');
	grunt.loadNpmTasks('grunt-karma');
	grunt.loadNpmTasks('grunt-ftp-push');

	grunt.registerTask('push', ['ftp_push:all']);
	grunt.registerTask('html', ['ftp_push:html']);
	grunt.registerTask('css', ['sass', 'ftp_push:css']);
	grunt.registerTask('test', ['karma']);


	grunt.registerTask('js', '', function(folder) {
		var path = (folder == undefined) ? '**' : folder;
		grunt.config.set('path', path)
		grunt.task.run('ftp_push:js');
	});

	grunt.registerTask('default', ['sass', 'ftp_push:all']);
};
