var gulp = require('gulp');
var babel = require('gulp-babel');

var PATH_JSX = 'src/*.jsx'
var PATH_MAIN = 'lib/TextField.js'

gulp.task('jsx', function() {
    gulp.src(PATH_JSX)
        .pipe(babel())
        .pipe(gulp.dest('lib'))
});

gulp.task('default', ['jsx']);
