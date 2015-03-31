'use strict';

var gulp = require('gulp');
var sass = require('gulp-ruby-sass');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');

var browserSync = require('browser-sync');
var reload = browserSync.reload;

var plumber = require('gulp-plumber');
var fileinclude = require('gulp-file-include');

// load plugins
//var $ = require('gulp-load-plugins')();

// Styles Task
gulp.task('styles', function () {
    return sass('app/sass/main.scss', {
      sourcemap: true,
      style: 'compact'
    })
        .pipe(plumber())
        .pipe(autoprefixer('last 2 versions', 'Explorer >= 9', 'Firefox >= 20'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('app/css'))
        .pipe(reload({stream:true}))
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

gulp.task('watch', ['serve'], function () {

    // watch for changes
    gulp.watch(['app/**/*.html'], ['fileinclude',reload]);
    gulp.watch('app/sass/**/*.scss', ['styles']);
    //gulp.watch('app/scripts/**/*.js', ['scripts']);
    //gulp.watch('app/images/**/*', ['images']);
    ////gulp.watch('bower.json', ['wiredep']);
});
