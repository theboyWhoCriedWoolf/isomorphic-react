
var gulp 			= require('gulp');
var isProduction 	= (process.env.NODE_ENV === 'production');

var sass = require('gulp-sass')
	gutil = require('gulp-util'),
	concat = require('gulp-concat'),
	cleanCss = require('gulp-minify-css'),
    plumber = require('gulp-plumber'),
	watch = require('gulp-watch');


/**
 * extend gulp src in order to catch any errors
 */
gulp.plumbedSrc = function() {
  return gulp.src.call( gulp, Array.prototype.slice.call(arguments, 0) )
    .pipe( plumber( { errorHandler : handleErrors }));
};


function handleErrors()
{
    var args = Array.prototype.slice.call(arguments);
    notify.onError({
        title: "Compile Error",
        message: "<%= error.message %>"
    }).apply(this, args);

     // Keep gulp from hanging on this task
    this.emit('end');
}

gulp.task('seperateSass', function()
{
	gulp.plumbedSrc('./app/styles/**/*.scss')
        .pipe(sass())
        .pipe( isProduction? cleanCss() : gutil.noop() )
        .pipe(gulp.dest('./public/css'));
})

gulp.task('complete', function()
{
	gulp.plumbedSrc('./app/styles/**/*.scss')
        .pipe(sass())
        .pipe(concat('main.css'))
        .pipe( isProduction? cleanCss() : gutil.noop() )
        .pipe(gulp.dest('./public/css'));
})

gulp.task('watch', [ 'seperateSass', 'complete' ],  function()
{
	[ 'seperateSass', 'complete' ].map(function( taskName ) {
		watch( './app/styles/**/*.scss', function() { gulp.start(taskName); });
	});
	
})


gulp.task('build', [ 'seperateSass', 'complete' ]);