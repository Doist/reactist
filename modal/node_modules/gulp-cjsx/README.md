# Gulp-Cjsx

[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Coveralls Status][coveralls-image]][coveralls-url] [![Dependencies][dependencies-image]][dependencies-url]

Transforms [coffee-react][coffee-react] 'cjsx' files to JavaScript

[coffee-react]: https://github.com/jsdf/coffee-react

## Usage

```
var cjsx = require('gulp-cjsx');

gulp.task('cjsx', function() {
  gulp.src('./src/*.cjsx')
    .pipe(cjsx({bare: true}).on('error', gutil.log))
    .pipe(gulp.dest('./public/'));
});
```

## Options

The options object supports the same options as the standard CoffeeScript compiler.

## License

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   [http://www.apache.org/licenses/LICENSE-2.0](http://www.apache.org/licenses/LICENSE-2.0)

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

[npm-url]: https://npmjs.org/package/gulp-cjsx
[npm-image]: http://img.shields.io/npm/v/gulp-cjsx.svg

[travis-url]: https://travis-ci.org/mtscout6/gulp-cjsx
[travis-image]: https://travis-ci.org/mtscout6/gulp-cjsx.svg?branch=master

[coveralls-url]: https://coveralls.io/r/mtscout6/gulp-cjsx
[coveralls-image]: https://img.shields.io/coveralls/mtscout6/gulp-cjsx.svg?branch=master

[dependencies-url]: https://www.versioneye.com/user/projects/53c6e2d96c18d523e2000220
[dependencies-image]: https://www.versioneye.com/user/projects/53c6e2d96c18d523e2000220/badge.svg
