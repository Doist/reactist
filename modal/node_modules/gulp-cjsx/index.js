var isWin          = /^win/.test(process.platform);
var through        = require('through2').obj;
var cjsx           = require('coffee-react');
var gutil          = require('gulp-util');
var Buffer         = require('buffer').Buffer;
var applySourceMap = require('vinyl-sourcemaps-apply');
var path           = require('path');
var merge          = require('merge');

function error(err, options) {
  return new gutil.PluginError('gulp-cjsx', err, options);
};

module.exports = function(opt) {
  function modifyFile(file, enc, callback) {
    if (file.isNull()) return callback(null, file); // pass along
    if (file.isStream()) return callback(error('Streaming not supported'));

    var data;
    var str  = file.contents.toString('utf8');
    var dest = gutil.replaceExtension(file.path, '.js');

    var options = merge({
      bare:           false,
      header:         false,
      sourceMap:      !!file.sourceMap,
      sourceRoot:     false,
      literate:       /\.(litcoffee|coffee\.md)$/.test(file.path),
      filename:       file.path,
      sourceFiles:    [path.basename(file.path)],
      generatedFile:  path.basename(dest)
    }, opt);

    try {
      data = cjsx.compile(str, options);
    } catch (err) {
      return callback(error(err))
    }

    if (data.v3SourceMap && file.sourceMap) {
      applySourceMap(file, data.v3SourceMap);
      file.contents = new Buffer(data.js);
    } else {
      file.contents = new Buffer(data);
    }

    file.path = dest;
    callback(null, file)
  };

  return through(modifyFile);
};
