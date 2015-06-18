var isWin      = /^win/.test(process.platform);
var cjsxPlugin = require('../');
var should     = require('should');
var cjsx       = require('coffee-react');
var gutil      = require('gulp-util');
var fs         = require('fs');
var path       = require('path');
var sourcemaps = require('gulp-sourcemaps');
var stream     = require('stream');
var _          = require('lodash');
require('mocha');

var createFile = function (filepath, contents) {
  var base = path.dirname(filepath);
  return new gutil.File({
    path: filepath,
    base: base,
    cwd: path.dirname(base),
    contents: contents
  });
}

describe('gulp-cjsx', function() {
  describe('cjsx()', function() {
    before(function() {
      this.testData = function (expected, newPath, done) {
        var newPaths = [newPath],
            expectedSourceMap;

        if (expected.v3SourceMap) {
          expectedSourceMap = JSON.parse(expected.v3SourceMap);
          expected = [expected.js];
        } else {
          expected = [expected];
        }

        return function (newFile) {
          this.expected = expected.shift();
          this.newPath  = newPaths.shift();
          if(isWin){
           this.newPath = this.newPath.replace(/\//g, '\\');
          }

          should.exist(newFile);
          should.exist(newFile.path);
          should.exist(newFile.relative);
          should.exist(newFile.contents);
          newFile.path.should.equal(this.newPath);
          newFile.relative.should.equal(path.basename(this.newPath));

          String(newFile.contents).should.equal(this.expected);

          if (expectedSourceMap) {
            // check whether the sources from the coffee have been
            // applied to the files source map
            newFile.sourceMap.sources
              .should.containDeep(expectedSourceMap.sources);
          }

          if (done && !expected.length) {
            done.call(this);
          }
        }
      };
    });

    it('should pass along file if isNull()', function(done) {
      var file = {
        isNull: function() { return true; }
      };
      timesCalled = 0;
      waitForTwoCalls = function(){
        timesCalled++;
        if(timesCalled === 2)
          done();
      }
      cjsxStream = cjsxPlugin({})
        .on('error', waitForTwoCalls)
        .on('data', function(newFile) {
          newFile.should.equal(file); 
          waitForTwoCalls();
        });
      cjsxStream.write(file);
      cjsxStream.write(file);
    });

    it('should error if input is stream', function(done) {
      var input = {
        isNull: function() { return false; },
        isStream: function() { return true; }
      };

      cjsxPlugin({})
        .on('error', function(err) {
          err.plugin.should.equal('gulp-cjsx');
          err.message.should.equal('Streaming not supported');
          done();
        })
        .on('data', function(newFile) {
          throw new Error("no file should have been emitted!");
        })
        .write(input);
    });

    it('should concat two files', function(done) {
      var filepath = "/home/contra/test/file.coffee";
      var contents = new Buffer("a = 2");
      var opts = {bare: true};
      var expected = cjsx.compile(String(contents), opts);

      cjsxPlugin(opts)
        .on('error', done)
        .on('data', this.testData(expected, "/home/contra/test/file.js", done))
        .write(createFile(filepath, contents));
    });

    it('should emit parsing errors correctly', function(done) {
      var filepath = "/home/contra/test/file.coffee";
      var contents = new Buffer("if a()\r\n  then huh");

      cjsxPlugin({bare: true})
        .on('error', function(err) {
          err.message.should.equal('unexpected then');
          done();
        })
        .on('data', function(newFile) {
          throw new Error("no file should have been emitted!");
        })
        .write(createFile(filepath, contents));
    });

    var tests = [{
      type: '*.coffee',
      source: 'test/fixtures/grammar.coffee',
      sourceFile: 'grammar.coffee',
      dest: 'test/fixtures/grammar.js',
      destFile: 'grammar.js'
    }, {
      type: '*.cjsx',
      source: 'test/fixtures/react.cjsx',
      sourceFile: 'react.cjsx',
      dest: 'test/fixtures/react.js',
      destFile: 'react.js'
    }]

    _.forEach(tests, function(test){
      var filepath = test.source;
      var contents = new Buffer(fs.readFileSync(filepath));

      it('should compile a file (no bare) | ' + test.type, function(done) {
        var expected = cjsx.compile(String(contents));

        cjsxPlugin()
          .on('error', done)
          .on('data', this.testData(expected, test.dest, done))
          .write(createFile(filepath, contents));
      });

      it('should compile a file (with bare) | ' + test.type, function(done) {
        var opts = {bare: true};
        var expected = cjsx.compile(String(contents), opts);

        cjsxPlugin(opts)
          .on('error', done)
          .on('data', this.testData(expected, test.dest, done))
          .write(createFile(filepath, contents));
      });

      it('should compile a file with source map | ' + test.type, function(done) {
        var expected = cjsx.compile(String(contents), {
          sourceMap: true,
          sourceFiles: [test.sourceFile],
          generatedFile: test.destFile
        });

        var stream = sourcemaps.init();
        stream.write(createFile(filepath, contents))
        stream
          .pipe(cjsxPlugin({}))
            .on('error', done)
            .on('data', this.testData(expected, test.dest, done));
      });

      it('should compile a file with bare and with source map | ' + test.type, function(done) {
        var expected = cjsx.compile(String(contents), {
          bare: true,
          sourceMap: true,
          sourceFiles: [test.sourceFile],
          generatedFile: test.destFile
        });

        var stream = sourcemaps.init();
        stream.write(createFile(filepath, contents));
        stream
          .pipe(cjsxPlugin({bare: true}))
            .on('error', done)
            .on('data', this.testData(expected, test.dest, done));
      });

      it('should compile a file (no header) | ' + test.type, function(done) {
        var expected = cjsx.compile(String(contents), {header: false});

        cjsxPlugin()
          .on('error', done)
          .on('data', this.testData(expected, test.dest, done))
          .write(createFile(filepath, contents));
      });

      it('should compile a file (with header) | ' + test.type, function(done) {
        var expected = cjsx.compile(String(contents), {header: true});

        cjsxPlugin({header: true})
          .on('error', done)
          .on('data', this.testData(expected, test.dest, done))
          .write(createFile(filepath, contents));
      });
    });

    it('should compile a literate file', function(done) {
      var filepath = "test/fixtures/journo.litcoffee";
      var contents = new Buffer(fs.readFileSync(filepath));
      var opts = {literate: true};
      var expected = cjsx.compile(String(contents), opts);

      cjsxPlugin(opts)
        .on('error', done)
        .on('data', this.testData(expected, "test/fixtures/journo.js", done))
        .write(createFile(filepath, contents));
    });

    it('should compile a literate file (implicit)', function(done) {
      var filepath = "test/fixtures/journo.litcoffee";
      var contents = new Buffer(fs.readFileSync(filepath));
      var expected = cjsx.compile(String(contents), {literate: true});

      cjsxPlugin()
        .on('error', done)
        .on('data', this.testData(expected, "test/fixtures/journo.js", done))
        .write(createFile(filepath, contents));
    });

    it('should compile a literate file (with bare)', function(done) {
      var filepath = "test/fixtures/journo.litcoffee";
      var contents = new Buffer(fs.readFileSync(filepath));
      var opts = {literate: true, bare: true};
      var expected = cjsx.compile(String(contents), opts);

      cjsxPlugin(opts)
        .on('error', done)
        .on('data', this.testData(expected, "test/fixtures/journo.js", done))
        .write(createFile(filepath, contents));
    });

    it('should compile a literate file with source map', function(done) {
      var filepath = "test/fixtures/journo.litcoffee";
      var contents = new Buffer(fs.readFileSync(filepath));
      var expected = cjsx.compile(String(contents), {
        literate: true,
        sourceMap: true,
        sourceFiles: ['journo.litcoffee'],
        generatedFile: 'journo.js'
      });

      var stream = sourcemaps.init();
      stream.write(createFile(filepath, contents));
      stream
        .pipe(cjsxPlugin({literate: true}))
          .on('error', done)
          .on('data', this.testData(expected, "test/fixtures/journo.js", done))
    });

    it('should compile a literate file with bare and with source map', function(done) {
      var filepath = "test/fixtures/journo.litcoffee";
      var contents = new Buffer(fs.readFileSync(filepath));
      var expected = cjsx.compile(String(contents), {
        literate: true,
        bare: true,
        sourceMap: true,
        sourceFiles: ['journo.litcoffee'],
        generatedFile: 'journo.js'
      });

      var stream = sourcemaps.init();
      stream.write(createFile(filepath, contents));
      stream
        .pipe(cjsxPlugin({literate: true, bare: true}))
          .on('error', done)
          .on('data', this.testData(expected, "test/fixtures/journo.js", done));
    });
  });
});
