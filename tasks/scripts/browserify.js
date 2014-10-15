'use strict';

var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var hbsfy = require('hbsfy');
var entry_filename = 'main.js';
var output_path = './dist/js';
var files = ['./src/' + entry_filename];

gulp.task('browserify', function() {
    var bundleStream = browserify({
        entries: files
    });
    bundleStream
        .transform(hbsfy)
        .on('error', function(err) {
            console.log(err);
        })
        .bundle()
        .on('error', function(err) {
            console.log(err);
        })
        .pipe(source(entry_filename))
        .on('error', function(err) {
            console.log(err);
        })
        .pipe(gulp.dest(output_path));
});