var gulp = require('gulp');
gulp.task('build', ['browserify', 'uglify', 'lint', 'jsdocs']);