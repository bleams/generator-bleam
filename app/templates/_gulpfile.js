'use strict';
// generated on 2015-02-18 using generator-gulp-bootstrap 0.0.4

var gulp = require('gulp');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var gutil = require('gulp-util');
var plumber = require('gulp-plumber');
var fileinclude = require('gulp-file-include');
var sourcemaps = require('gulp-sourcemaps');
var prettify = require('gulp-jsbeautifier');

// load plugins
var $ = require('gulp-load-plugins')();

gulp.task('styles', function () {
    return gulp.src('app/styles/main.scss')
        .pipe(sourcemaps.init())
        .pipe(plumber())
        .pipe($.sass({
            errLogToConsole: true
//            sourceMap: 'inline',
//            sourceComments: true,
//            sourceComments: 'map'
        }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('app/styles'))


        .pipe(sourcemaps.init({loadMaps: true}))
            .pipe($.autoprefixer('last 2 versions', 'Explorer >= 9', 'Firefox >= 20'))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('app/styles'))
        .pipe(reload({stream:true}))

        .pipe($.size())
        .pipe($.notify("Compilation complete."));
});

gulp.task('scripts', function () {
    return gulp.src('app/scripts/**/*.js')
//        .pipe($.jshint())
//        .pipe($.jshint.reporter(require('jshint-stylish')))
        .pipe($.size());
});

//file include
gulp.task('fileinclude', function() {
    gulp.src(['app/includes/*.html'])
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(gulp.dest('app/'));
});

//gulp.task('pages', function(){
//    var sources = ["article.html", 'blog.html'];
//
//    for (var i = 0, pages = sources.length; i < pages; i++ ) {
//        console.log('la page est '+ i)
//        //if(i= "article.html") {
//        //    gulp.src('app/index.html')
//        //        .pipe($.notify("Compilation d'article OK."))
//        //        .pipe(gulp.dest('dist/essai'));
//        //}
//        //if(i= "blog.html") {
//        //    //console.log('la page est '+ i)
//        //    gulp.src('app/index.html')
//        //        .pipe($.notify("Compilation de blog OK."))
//        //        .pipe(gulp.dest('dist/blog'));
//        //}
//    }
//});

gulp.task('html', ['styles', 'scripts'], function () {
    var jsFilter = $.filter('**/*.js');
    var cssFilter = $.filter('**/*.css');

    return gulp.src('app/*.html')
        .pipe($.useref.assets())
        .pipe(jsFilter)
//        .pipe($.uglify())
        .pipe(jsFilter.restore())
        .pipe(cssFilter)
//        .pipe($.csso())
        .pipe(cssFilter.restore())
        .pipe($.useref.restore())
        .pipe($.useref())
        .pipe(prettify({indentSize: 4}))
        .pipe(gulp.dest('dist'))
        .pipe($.size());
});

gulp.task('images', function () {
    return gulp.src('app/images/**/*')
        .pipe($.cache($.imagemin({
            optimizationLevel: 3,
            progressive: true,
            interlaced: true
        })))
        .pipe(gulp.dest('dist/images'))
        .pipe(reload({stream:true, once:true}))
        .pipe($.size());
});

gulp.task('fonts', function () {
    var streamqueue = require('streamqueue');
    return streamqueue({objectMode: true},
        $.bowerFiles(),
        gulp.src('app/fonts/**/*')
    )
        .pipe($.filter('**/*.{eot,svg,ttf,woff}'))
        .pipe($.flatten())
        .pipe(gulp.dest('dist/fonts'))
        .pipe($.size());
});

gulp.task('clean', function () {
    return gulp.src(['app/styles/main.css', 'dist'], { read: false }).pipe($.clean());
});

gulp.task('build', ['html', 'images', 'fonts']);

gulp.task('default', ['clean'], function () {
    gulp.start('build');
});

gulp.task('serve', ['styles'], function () {
    browserSync.init(null, {
        server: {
            baseDir: 'app',
            directory: true
        },
        debugInfo: false,
        open: false,
        notify: false,
        ghostMode: false
        //hostnameSuffix: ".xip.io"
    }, function (err, bs) {
        require('opn')(bs.options.url);
        console.log('Started connect web server on ' + bs.options.url);
    });
});

// inject bower components
gulp.task('wiredep', function () {
    var wiredep = require('wiredep').stream;
    gulp.src('app/styles/*.scss')
        .pipe(wiredep({
            directory: 'app/bower_components'
        }))
        .pipe(gulp.dest('app/styles'));
    gulp.src('app/*.html')
        .pipe(wiredep({
            directory: 'app/bower_components',
            exclude: ['bootstrap-sass-official']
        }))
        .pipe(gulp.dest('app'));
});

gulp.task('watch', ['serve'], function () {
 
    // watch for changes
    gulp.watch(['app/**/*.html'], ['fileinclude',reload]);
 
    gulp.watch('app/styles/**/*.scss', ['styles']);
    gulp.watch('app/scripts/**/*.js', ['scripts']);
    gulp.watch('app/images/**/*', ['images']);
    gulp.watch('bower.json', ['wiredep']);
});
