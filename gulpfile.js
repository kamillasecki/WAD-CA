var gulp = require('gulp');
var LiveServer = require('gulp-live-server');
var browserSync = require('browser-sync');
var browserify = require('browserify'); //bundles js
var reactify = require('reactify'); // transforms jsx to js
var source = require('vinyl-source-stream');  // Use conventional text streams with gulp
var connect = require('gulp-connect'); //runs local devserver

gulp.task('live-server',function(){
    var server = new LiveServer('server/main.js');
    server.start();
});

gulp.task('bundle',['copy'], function(){
    return browserify({
        entries:'app/main.jsx',
        debug:true,
    })
    .transform(reactify)
    .bundle()
    .pipe(source('app.js'))
    .pipe(gulp.dest('./.temp'))
    .pipe(connect.reload());
});

gulp.task('copy', function() {
    gulp.src(['app/*.css']).
    pipe(gulp.dest('./.temp'));
})

gulp.task('default' , ['bundle','live-server'] , function() {
    browserSync.init({
         proxy:process.env.IP + ":" + process.env.PORT
    });
});

gulp.task('serve',['bundle','live-server'],function(){
    browserSync.init(null,{
        proxy:process.env.IP + ":" + process.env.PORT,
        port: 9001
    })
});
