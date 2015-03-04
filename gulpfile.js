var gulp = require('gulp'),
    connect = require('gulp-connect');


gulp.task('watch', function(){
    gulp.watch('./*', ['build']);
});

//
//gulp.task('server', function(){
//    connect.server({
//        port: 4001
//    });
//});

