var gulp = require('gulp'),
	path = require('path'),
	jshintReporter = require('jshint-stylish'),
	plugins = require('gulp-load-plugins')({
		config: path.join(__dirname, 'package.json')
	});

var path = {
	src: {
		files: 'src/**/*.js'
	}
}

gulp.task('jshint', gulp.series([], function(done) {
	return gulp.src(path.src.files)
	.pipe(plugins.jshint('.jshintrc'))
	.pipe(plugins.jshint.reporter(jshintReporter));
	done();
}));

gulp.task('build', gulp.series([], function() {
	var pkg = require('./bower.json');

	var header = ['/**',
		' * <%= pkg.name %>',
		' * <%= pkg.description %>',
		' * @version v<%= pkg.version %>',
		' * @author <%= pkg.authors[0]%>',
		' * @link <%= pkg.homepage %>',
		' * @license <%= pkg.license %>',
		' */',
		'(function (angular) {',
		'',
		''].join('\n');

	var footer = [
		'',
		'})(angular);',
		''].join('\n');

	return gulp.src([
		'src/ng-virtual-keyboard.js'
	])
	.pipe(plugins.concat('ng-virtual-keyboard.js'))
	.pipe(plugins.header(header, {pkg: pkg}))
	.pipe(plugins.footer(footer))
	.pipe(gulp.dest('./dist/'))
	.pipe(plugins.uglify())
	.pipe(plugins.concat('ng-virtual-keyboard.min.js'))
	.pipe(gulp.dest('./dist/'));
}));

gulp.task('default', gulp.series(['jshint', 'build'], function() {
	return gulp.watch(path.src.files, gulp.series(['jshint', 'build']));
}));
