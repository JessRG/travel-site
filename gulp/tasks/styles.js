//NPM plugin imports
var gulp = require('gulp'), //gulp plugin installed with npm
postcss = require('gulp-postcss'), // name of gulp postCSS plugin installed with npm
autoprefixer = require('autoprefixer'), //name of autoprefixer plugin installed with npm
cssvars = require('postcss-simple-vars'), //name of postcss-vars plugin installed with npm
nested = require('postcss-nested'), //name of postcss-nested plugin installed with npm
cssImport = require('postcss-import'), //name of postcss-import plugin installed with npm
mixins = require('postcss-mixins'); //name of mixins plugin

//This gulp task returns the asynchronous function gulp.src() to ensure that gulp is aware
//when this function complete. This is set in place to take advantage of the PostCSS
//and autoprefixer plugin installed with NPM (for nested CSS)
gulp.task('styles', function() {
	return gulp.src('./app/assets/styles/styles.css')
		.pipe(postcss([cssImport, mixins, cssvars, nested, autoprefixer]))
		.on('error', function(errorInfo) {
			console.log(errorInfo.toString());
			this.emit('end');
		})
		.pipe(gulp.dest('./app/temp/styles'));
});