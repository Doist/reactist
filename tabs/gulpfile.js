var gulp = require('gulp');
var cjsx = require('gulp-cjsx');
var source = require('vinyl-source-stream');

var PATH_CJSX = 'src/*.cjsx'
var PATH_MAIN = 'lib/Tabs.js'

// TASK: COFFEE
gulp.task('jsx', function() {
    gulp.src(PATH_CJSX)
        .pipe(cjsx())
        .pipe(gulp.dest('lib'))
});

// TASK: DEFAULT
gulp.task('default', ['jsx']);
