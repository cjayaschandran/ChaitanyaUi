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
			
			mkdirp(appDir + '/scripts');
			mkdirp(appDir + '/img');
			mkdirp(appDir + '/account');
			mkdirp(appDir + '/checkout');
			mkdirp(appDir + '/pdp');
			mkdirp(appDir + '/plp');
			mkdirp(appDir + '/cart');
			mkdirp(appDir + '/global');
			
			this.fs.copy(sourceRoot + '/.bowerrc', destRoot + '/.bowerrc');
			this.fs.copyTpl(sourceRoot + '/bower.json', destRoot + '/bower.json', templateContext);
			this.fs.copy(sourceRoot + '/.editorconfig', destRoot + '/.editorconfig');
			this.fs.copy(sourceRoot + '/.jshintrc', destRoot + '/.jshintrc');
			this.fs.copy(sourceRoot + '/README.md', destRoot + '/README.md');
			this.fs.copy(sourceRoot + '/robots.txt', appDir + '/robots.txt');
			this.fs.copyTpl(sourceRoot + '/package.json', destRoot + '/package.json', templateContext);

	},
	_getPrompts: function() {
		var prompts = [
			{
				name: 'name',
				message: 'What is the name of your project?',
				default: this.appName
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
		'\n     |   ' +  chalk.red.bold('   Welcome to McF-UI,') + '       |' +
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
	},
	install: function() {
		this.bowerInstall();
		this.npmInstall();
	}
});
