var gulp = require('gulp');
var cjsx = require('gulp-cjsx');
// var browserify = require('browserify');
var source = require('vinyl-source-stream');

var PATH_CJSX = 'src/*.cjsx'
var PATH_MAIN = 'lib/Tabs.js'

// TASK: COFFEE
gulp.task('jsx', function() {
    gulp.src(PATH_CJSX)
        .pipe(cjsx())
        .pipe(gulp.dest('lib'))
});

// // TASK: BROWSERIFY
// gulp.task('browserify', function() {
//     return browserify(PATH_MAIN)
//         .bundle()
//         .pipe(source('bundle.js'))
//         .pipe(gulp.dest('dist'));
// });

// TASK: DEFAULT
gulp.task('default', ['jsx']);
