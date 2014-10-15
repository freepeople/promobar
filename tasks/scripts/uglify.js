'use strict';

var gulp = require('gulp');
var uglify = require('gulp-uglify');

gulp.task('uglify', function () {
    return gulp.src('./dist/*.js')
        .pipe(uglify())
        .on('error', function(err) {
            console.log(err);
        })
        .pipe(gulp.dest('./dist'));
});