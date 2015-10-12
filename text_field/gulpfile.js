var gulp = require('gulp');
var cjsx = require('gulp-cjsx');
// var browserify = require('browserify');
var source = require('vinyl-source-stream');

var PATH_JSX = 'src/*.cjsx'
var PATH_MAIN = 'lib/TextField.js'

gulp.task('jsx', function() {
    gulp.src(PATH_JSX)
        .pipe(cjsx())
        .pipe(gulp.dest('lib'))
});

gulp.task('default', ['jsx']);
