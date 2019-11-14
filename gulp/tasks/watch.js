var gulp = require('gulp'), //gulp plugin installed with npm
watch = require('gulp-watch'), //name of gulp watch plugin installed with npm

//this particular plugin will help make modifications to this app occur automatically
//or "on the fly" as soon as the monitored files are modified (css files)
browserSync = require('browser-sync').create(); //name of browser-sync plugin installed with npm

//This is the gulp watch task which monitors the index html file and the styles css file
//if the styles css file is modified this task automatically executes the gulp styles task
//specified above (automation)
gulp.task('watch', function() {

	browserSync.init({
		notify: false,
		server: {
			baseDir: "app"
		}
	});

	watch('./app/index.html', function() {
		browserSync.reload();
	});

	watch('./app/assets/styles/**/*.css', function() {
		gulp.start('cssInject');
	});
});

//This gulp cssInject task will automatically (on the fly) update when any modifications are
//done to the css files, but this task will first begin and complete any dependency tasks (second parameter).
gulp.task('cssInject', ['styles'], function() {
	return gulp.src('./app/temp/styles/styles.css')
	.pipe(browserSync.stream());
});