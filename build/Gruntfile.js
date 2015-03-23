/* jslint es3: false */
/* global module:false */

module.exports = function(grunt) {
	
	'use strict';
	
	grunt.initConfig({
		
		/*----------------------------------( PACKAGE )----------------------------------*/
		
		/**
		 * The `package.json` file belongs in the root directory of your project,
		 * next to the `Gruntfile`, and should be committed with your project
		 * source. Running `npm install` in the same folder as a `package.json`
		 * file will install the correct version of each dependency listed therein.
		 *
		 * Install project dependencies with `npm install` (or `npm update`).
		 *
		 * @see http://gruntjs.com/getting-started#package.json
		 * @see https://npmjs.org/doc/json.html
		 * @see http://package.json.nodejitsu.com/
		 * @see http://stackoverflow.com/a/10065754/922323
		 */
		
		pkg : grunt.file.readJSON('package.json'),
		
		/*----------------------------------( BANNERS )----------------------------------*/
		
		/**
		 * Short and long banners.
		 *
		 * @see http://gruntjs.com/getting-started#an-example-gruntfile
		 */
		
		banner : {
			
			'short' : '/*! ' +
			          '<%= pkg.title || pkg.name %>' +
			          '<%= pkg.version ? " v" + pkg.version : "" %>' +
			          '<%= pkg.licenses ? " | " + _.pluck(pkg.licenses, "type").join(", ") : "" %>' +
			          '<%= pkg.homepage ? " | " + pkg.homepage : "" %>' +
			          ' */',
			
			'long' : '/**\n' +
			         ' * <%= pkg.title || pkg.name %>\n' +
			         '<%= pkg.description ? " * " + pkg.description + "\\n" : "" %>' +
			         ' *\n' +
			         '<%= pkg.author.name ? " * @author " + pkg.author.name + "\\n" : "" %>' +
			         '<%= pkg.author.url ? " * @link " + pkg.author.url + "\\n" : "" %>' +
			         '<%= pkg.homepage ? " * @docs " + pkg.homepage + "\\n" : "" %>' +
			         ' * @copyright Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>.\n' +
			         '<%= pkg.licenses ? " * @license Released under the " + _.pluck(pkg.licenses, "type").join(", ") + ".\\n" : "" %>' +
			         '<%= pkg.version ? " * @version " + pkg.version + "\\n" : "" %>' +
			         ' * @date <%= grunt.template.today("yyyy/mm/dd") %>\n' +
			         ' */\n\n',
			
		},
		
		/*----------------------------------( WATCH )----------------------------------*/
		
		/**
		 * Run predefined tasks whenever watched file patterns are added, changed
		 * or deleted.
		 *
		 * @see https://github.com/gruntjs/grunt-contrib-watch
		 */
		
		watch : {
			
			files : [
				
				'./files/<%= pkg.name %>.js',
				'../demo/**/*',
				
			],
			
			tasks : ['default'],
			
		},
		
		/*----------------------------------( JSHINT )----------------------------------*/
		
		/**
		 * Validate files with JSHint.
		 *
		 * @see https://github.com/gruntjs/grunt-contrib-jshint
		 * @see http://www.jshint.com/
		 * @see http://www.jshint.com/docs/
		 */
		
		jshint : {
			
			options : {
				
				jshintrc : '.jshintrc', // Defined options and globals.
				
			},
			
			init : [
				
				'./Gruntfile.js',
				'./files/<%= pkg.name %>.js',
				
			],
			
		},
		
		/*----------------------------------( CLEAN )----------------------------------*/
		
		/**
		 * Clean files and folders.
		 *
		 * @see https://github.com/gruntjs/grunt-contrib-clean
		 */
		
		clean : {
			
			options : {
				
				force : true, // Allows for deletion of folders outside current working dir (CWD). Use with caution.
				
			},
			
			init : [
				
				'../dist/**/*',
				
			],
			
		},
		
		/*----------------------------------( UGLIFY )----------------------------------*/
		
		/**
		 * Minify files with UglifyJS.
		 *
		 * @see https://github.com/gruntjs/grunt-contrib-uglify
		 * @see http://lisperator.net/uglifyjs/
		 */
		
		uglify : {
			
			target : {
				
				options : {
					
					banner : '<%= banner.short %>',
					
					compress : {
						
						drop_console : true,
						
					},
					
				},
				
				files : {
					
					'../dist/<%= pkg.name %>.min.js': [
						
						'./files/<%= pkg.name %>.js',
						
					],
					
				},
				
			},
			
		},
		
		/*----------------------------------( CONCAT )----------------------------------*/
		
		/**
		 * Concatenate files.
		 *
		 * @see https://github.com/gruntjs/grunt-contrib-concat
		 * @see https://github.com/gruntjs/grunt-contrib-concat/pull/25
		 */
		
		concat : {
			
			options : {
				
				banner : '<%= banner.long %>',
				
			},
			
			files : {
				
				src : [
					
					'./files/<%= pkg.name %>.js',
					
				],
				
				dest : '../dist/<%= pkg.name %>.js',
				
			},
			
		},
		
	});
	
	/*----------------------------------( TASKS )----------------------------------*/
	
	grunt.loadNpmTasks('grunt-contrib-watch');
	
	grunt.loadNpmTasks('grunt-contrib-jshint');
	
	grunt.loadNpmTasks('grunt-contrib-clean');
	
	grunt.loadNpmTasks('grunt-contrib-uglify');
	
	grunt.loadNpmTasks('grunt-contrib-concat');
	
	//----------------------------------
	
	grunt.registerTask('default', ['jshint', 'clean', 'uglify', 'concat',]);
	
};
