var gulp = require('gulp');
var args = require('yargs').argv;
var config = require('./gulp.config')();
var $ = require('gulp-load-plugins')({lazy: true});

gulp.task('style', function() {
  log('Analyzing source with JSHint and JSCS');
  return gulp
    .src(config.alljs)
    .pipe($.if(args.verbose, $.print()))
    .pipe($.jscs())
    .pipe($.jshint())
    .pipe($.jshint.reporter('jshint-stylish', {verbose: true}));
});

gulp.task('inject', function() {
  var options = config.getWiredepDefaultOptions();
  var wiredep = require('wiredep').stream;
  return gulp
    .src(config.index)
    .pipe(wiredep(options))
    .pipe($.inject(gulp.src(config.js), {ignorePath: '/public'})) // write in blog about this situation
    .pipe($.inject(gulp.src(config.css), {ignorePath: '/public'}))
    .pipe(gulp.dest(config.views));
});

function log(msg) {
  if (typeof(msg) === 'object') {
    for (var item in msg) {
      if (msg.hasOwnProperty(item)) {
        $.utl.log($.util.colors.blue(msg[item]));
      }
    }
  } else {
    $.util.log($.util.colors.blue(msg));
  }
}
