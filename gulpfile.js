var gulp = require('gulp');
var connect = require('gulp-connect');

gulp.task('connect', function() {
    connect.server({
        root: 'app',
        livereload: true
    });
    connect.serverClose();
});


gulp.task('task-name', function() { 
    // Stuff here
});

gulp.task('hello', function() { 
    console.log('Hello Sam');
});