
var gulp 		= require('gulp'),
	$ 			= require('gulp-load-plugins')(),
	prod 		= $.util.env.production || ( process.env.NODE_ENV === 'production' ),

	
	config 		= {
		tasks : ['sass', 'assets', 'server'],

		sass : {
			src  : './app/sass/**/**.scss',
			dest : 'public/css',
			opts : {
				includePaths : ['node_modules', './app/sass']
			}
		},
		assets : {
			src  : './app/assets/**/**',
			dest : 'public/assets'
		},
		minOpts : {
			outputStyle : 'compact'
		}
	}; 



/**
 * extend gulp src in order to catch any errors
 */
gulp.plumbedSrc = function() {
  return gulp.src.call( gulp, Array.prototype.slice.call(arguments, 0) )
    .pipe( $.plumber( { errorHandler : handleErrors }));
};


/**
 * handle gulp task errors
 */
function handleErrors()
{
	var args = Array.prototype.slice.call(arguments);
    $.notify.onError({
        title: "Compile Error",
        message: "<%= error.message %>"
    }).apply(this, args);

     // Keep gulp from hanging on this task
    this.emit('end');
}


/**
 * watch server
 */
gulp.task('server', function()
{
	var nodemon = require('nodemon');
	nodemon({
	    script 	: 'index.js',
	    ignore 	: ['./app/assets', './public', './node_modules', './views', './gulpfile', './app/components', './app/sass', './app/browser.js'],
	    ext 	: 'js',
	    env 	: { 'NODE_ENV': (prod? 'production' : 'development') }
	  })
});


/**
 * sass compiler
 */
gulp.task('sass', [ 'sass:concat' ], function()
{
	return gulp.plumbedSrc( config.sass.src )
		.pipe( $.autoprefixer({ browsers: ['last 2 versions'] }) )
		.pipe( $.sass( config.sass.opts ) )
		.pipe( prod? $.minifyCss(config.minOpts) : $.util.noop() )
		.pipe( gulp.dest( config.sass.dest ) );
})

/**
 * compile all sass files and 
 * concatenate into main
 */
gulp.task('sass:concat', function()
{
	return gulp.plumbedSrc( config.sass.src )
		.pipe( $.autoprefixer({ browsers: ['last 2 versions'] }) )
		.pipe( $.sass( config.sass.opts ) )
		.pipe( $.concat('main.css') )
		.pipe( prod? $.minifyCss(config.minOpts) : $.util.noop() )
		.pipe( gulp.dest( config.sass.dest ) );
})


gulp.task('assets', function()
{
	var fontFiler = $.filter('**/*.{eot,svg,ttf,woff}'),
		imgFilter = $.filter('**/*.{gif,jpg,png,svg}'),
		pngquant  = require('imagemin-pngquant');

	return  gulp.plumbedSrc( config.assets.src )
			.pipe( fontFiler )
			.pipe( $.fontmin() )
			.pipe( fontFiler.restore() )
			.pipe( imgFilter )
			.pipe( $.imagemin({
	            progressive 	: true,
	            svgoPlugins 	: [{removeViewBox: false}],
	            use 			: [pngquant()]
	        }))
	        .pipe( imgFilter.restore() )
	        .pipe( gulp.dest( config.assets.dest ) );
})

/**
 * watch gulp files and run
 * the rquired tasks
 */
gulp.task('watch', ['build'], function()
{
	config.tasks.forEach(function(taskName, index){
		if(  config[taskName] ) {
			$.watch( config[taskName].src, function() { gulp.start( taskName ) } );
		} else {
			gulp.start( taskName );
		}
		
	});
});

gulp.task('build',[ 'sass' , 'assets'] );


