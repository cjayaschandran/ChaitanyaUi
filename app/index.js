'use strict'

var generators = require('yeoman-generator'),
      mkdirp = require('mkdirp'),
	  yosay = require('yosay'),
	  chalk = require('chalk');

module.exports = generators.Base.extend({
	_createProjectFileSystem: function() {
		var destRoot = this.destinationRoot(),
			sourceRoot = this.sourceRoot(),
			appDir = destRoot + '/app',
			templateContext = {
				appname: this.appname,
				appdescription: this.appdescription,
				appversion: this.appversion,
				applicense: this.applicense,
				appauthor: this.appauthor,
				appemail: this.appemail,
				includeSass: this.includeSass,
				includeModernizr: this.includeModernizr,
				includeJQuery: this.includeJQuery,
				includeBootstrap: this.includeBootstrap,
				includeAngular: this.includeAngular
				
			};
			
			mkdirp(appDir + '/img');
			mkdirp(appDir + '/fonts');
			mkdirp(appDir + '/js');
			mkdirp(appDir + '/modal');
			mkdirp(appDir + '/modules');
			mkdirp(appDir + '/scripts');
			mkdirp(appDir + '/scripts/templates');			
			mkdirp(appDir + '/account');
			mkdirp(appDir + '/account/templates');
			mkdirp(appDir + '/browse');
			mkdirp(appDir + '/browse/templates');
			mkdirp(appDir + '/clp');
			mkdirp(appDir + '/clp/templates');
			mkdirp(appDir + '/checkout');
			mkdirp(appDir + '/checkout/templates');
			mkdirp(appDir + '/opo');
			mkdirp(appDir + '/opo/templates');
			mkdirp(appDir + '/pdp');
			mkdirp(appDir + '/pdp/templates');
			mkdirp(appDir + '/plp');
			mkdirp(appDir + '/plp/templates');
			mkdirp(appDir + '/cart');
			mkdirp(appDir + '/cart/templates');
			mkdirp(appDir + '/global');
			mkdirp(appDir + '/global/templates');
			mkdirp(appDir + '/static');
			mkdirp(appDir + '/static/html');
			mkdirp(appDir + '/static/html/cart');
			mkdirp(appDir + '/static/html/checkout');
			mkdirp(appDir + '/static/html/scripts');
			mkdirp(appDir + '/static/html/account');
			mkdirp(appDir + '/static/html/browse');
			mkdirp(appDir + '/static/html/clp');
			mkdirp(appDir + '/static/html/opo');
			mkdirp(appDir + '/static/html/pdp');
			mkdirp(appDir + '/static/html/plp');
			mkdirp(appDir + '/static/html/global');
			mkdirp(appDir + '/static/jsp');
			mkdirp(appDir + '/static/jsp/cart');
			mkdirp(appDir + '/static/jsp/checkout');
			mkdirp(appDir + '/static/jsp/scripts');
			mkdirp(appDir + '/static/jsp/account');
			mkdirp(appDir + '/static/jsp/browse');
			mkdirp(appDir + '/static/jsp/clp');
			mkdirp(appDir + '/static/jsp/opo');
			mkdirp(appDir + '/static/jsp/pdp');
			mkdirp(appDir + '/static/jsp/plp');
			mkdirp(appDir + '/static/jsp/global');
			
			this.fs.copy(sourceRoot + '/.bowerrc', destRoot + '/.bowerrc');
			this.fs.copyTpl(sourceRoot + '/bower.json', destRoot + '/bower.json', templateContext);
			this.fs.copy(sourceRoot + '/.editorconfig', destRoot + '/.editorconfig');
			this.fs.copy(sourceRoot + '/.jshintrc', destRoot + '/.jshintrc');
			this.fs.copy(sourceRoot + '/README.md', destRoot + '/README.md');
			this.fs.copy(sourceRoot + '/robots.txt', appDir + '/robots.txt');
			this.fs.copyTpl(sourceRoot + '/package.json', destRoot + '/package.json', templateContext);
			this.fs.copy(sourceRoot + '/index.html', appDir + '/index.html');

	},
	_getPrompts: function() {
		var prompts = [
			{
				name: 'name',
				message: 'What is the name of your project?',
				default: 'TestProj'
			},
			
			{
				name: 'description',
				message: 'What is the description of the project?'
			},
			{
				name: 'version',
				message: 'What is the version of your project?',
				default: '0.0.0'
			},
			
			{
				name: 'license',
				message: 'How is your project licensed?',
				default: 'MIT'
			},
			{
				name: 'yourname',
				message: 'What is your name?'
			},
			
			{
				name: 'email',
				message: 'What is your email address?'
			},
			{
				type: 'checkbox',
				message: "Choose frameworks",
				name: "features",
				choices: [{
					name: 'jQuery',
					value: 'includeJQuery',
					checked: true
				  },{
					name: 'Sass',
					value: 'includeSass',
					checked: true
				  }, {
					name: 'Bootstrap',
					value: 'includeBootstrap',
					checked: true
				  }, {
					name: 'Angular',
					value: 'includeAngular',
					checked: true
				},{
					name: 'Modernizr',
					value: 'includeModernizr',
					checked: true
				}]
			}
		];
		return prompts;
	},
	
	_createGruntfile: function() {
		var sassfileExtention = (this.option.Sass) ? '.sass' : '.scss',
			destRoot = this.destinationRoot(),
			appDir = destRoot + '/app',
			sassOutFile = appDir + '/styles/host.css',
			sassInFile = appDir + '/sass/host' + sassfileExtention,
			sassConfig = {
				options: {
					outputStyle: 'compressed'
				},
				dist: {
					files: {}
				}
			},
			pathConfig = {
				
				build: {
					path: {},
					app: 'chrome'
				},
				file: {
					path: '/app/account'
				}
			};
			sassConfig.dist.files[sassOutFile] = sassInFile;
		
			
			pathConfig.build.path = this.destinationRoot() + '/app/index.html';
		
		this.gruntfile.insertConfig('clean', '{files: ["dist"]}');
		this.gruntfile.insertConfig('jshint', '{all: ["Gruntfile.js", "app/scripts/**/*.js", "test/spec/**/*.js"],  options: {jshintrc: ".jshintrc"}}');
	
		this.gruntfile.insertConfig('jade', "{ options: {pretty: true}, compile: {        files: {          'static/html/homepage.html': ['app/global/templates/homepage.jade'],          'static/html/jade.html': ['app/global/templates/jade.jade'],          'static/html/jade2.html': ['app/global/templates/jade2.jade'],          'static/html/jadeInclude.html': ['app/global/templates/jadeInclude.jade'],          'static/html/jadeTemplate.html': ['app/global/templates/jadeTemplate.jade'],          'static/html/jadeUsingmixin.html': ['app/global/templates/jadeUsingmixin.jade'],          'static/html/jadeCodeBlock.html': ['app/global/templates/jadeCodeBlock.jade']        },        options: {          data: {            test: true,            youAreUsingJade: true,            year: '<%= grunt.template.today(\"yyyy\") %>'          }        }      }, compile_jsp: {        files: {           'static/jsp/homepage.jsp': ['app/global/templates//homepage.jade'],           'static/jsp/jade.jsp': ['app/global/templates/jade.jade'],          'static/jsp/jade2.jsp': ['app/global/templates/jade2.jade'],           'static/jsp/jadeInclude.jsp': ['app/global/templates/jadeInclude.jade'],          'static/jsp/jadeTemplate.jsp': ['app/global/templates/jadeTemplate.jade'],          'static/jsp/jadeUsingmixin.jsp': ['app/global/templates/jadeUsingmixin.jade'],          'static/jsp/jadeCodeBlock.jsp': ['app/global/templates/jadeCodeBlock.jade']        },        options: {          data: {            test: true,            youAreUsingJade: false,            year: '<%= grunt.template.today(\"yyyy\") %>'          }        }      }}");
		
		this.gruntfile.insertConfig('open', '{build: ["dist"]}');
		this.gruntfile.insertConfig('sass', JSON.stringify(sassConfig));
		
		this.gruntfile.loadNpmTasks('grunt-contrib-clean');
		this.gruntfile.loadNpmTasks('grunt-contrib-jshint');
		this.gruntfile.loadNpmTasks('grunt-sass');
		this.gruntfile.loadNpmTasks('grunt-open');
		this.gruntfile.insertConfig('open', JSON.stringify(pathConfig));
		
		this.gruntfile.registerTask('default', ['clean', 'jshint', 'sass']);
		this.gruntfile.registerTask('onlyjade', ['jade', 'open']);

		
	},
	_saveAnswers: function(answers, callback) {
		this.appname = answers.name;
		this.appdescription = answers.description;
		this.appversion = answers.version;
		this.applicense = answers.license;
		this.appauthor = answers.yourname;
		this.appemail = answers.email;
		
		 var features = answers.features;
		 function hasFeature(feat) {
			return features && features.indexOf(feat) !== -1;
		}

		  this.includeSass = hasFeature('includeSass');
		  this.includeBootstrap = hasFeature('includeBootstrap');
		  this.includeModernizr = hasFeature('includeModernizr');		
		  this.includeJQuery = hasFeature('includeJQuery');
		  this.includeAngular = hasFeature('includeAngular');
		 
		callback();
	},
	initializing: function() {
		var welcome =
		'\n     .-------------------------------.' +
		'\n     |   ' +  chalk.red.bold('   Welcome to McF-Store,') + '    |' +
		'\n     |   ' +  chalk.red.bold('   Custom Generator!') + '        |' +
		'\n     \'-------------------------------\'' 
		;

		var message = chalk.yellow.bold('Welcome to jstack') + chalk.red.bold('Welcome to jstack');
		this.log(welcome);
	},
	
	prompting: function() {
		var done = this.async();
		this.prompt(this._getPrompts(), function (answers) {
			this._saveAnswers(answers, done);
		}.bind(this));
	},
	
	configuring: function() {
		this.config.save();
	},
	writing: function() {
		this._createProjectFileSystem();
		this._createGruntfile();
	},
	install: function() {
		this.bowerInstall();
		this.npmInstall();
	}
});
