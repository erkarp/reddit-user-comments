module.exports = function(grunt) {
//require('load-grunt-tasks')(grunt); // npm install --save-dev load-grunt-tasks

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
		ftp_push: {
			your_target: {
			  options: {
				host: "wdsclient.com",
				dest: "/public_html/em/code/",
				username: "wdsclien",
				password: "u=c@c3aM"
			  },
			  files: [
				{
				  expand: true,
				  cwd: '.',
				  src: [
					  "js/graph/*",
					  "js/subreddits/*",
					  "js/comments/*",
					  "*.html"
				  ]
				}
			  ]
			}
		}
	});

	grunt.loadNpmTasks('grunt-sass');
	grunt.loadNpmTasks('grunt-ftp-push');
	
	grunt.registerTask('push', ['ftp_push']);
	

	grunt.registerTask('go', 'push individual files', function(newFiles) {
		
		grunt.log.writeln(grunt.config.data.ftp_push.your_target.files[0].src);
		grunt.config.set(grunt.config.escape('grunt.config.data.ftp_push.your_target.files.0'), {'src':'["index.html"]'});
		grunt.log.writeln(grunt.config.data.ftp_push.your_target.files[0].src);
	//	grunt.task.run(['ftp_push']);
	});	


	
};