(function () {
  'use strict';

  var gulp = require('gulp'),
      plugins = require('gulp-load-plugins')(),
      path = require('path'),
      browserify = require('browserify'),
      source = require('vinyl-source-stream');

  var paths = {
    src: './src',
    out: './out',
    tmp: './tmp'
  };

  paths.coffee = [path.join(paths.src, '**/*.coffee')];

  gulp.task('clean', function() {
    return gulp.src([paths.out, paths.tmp], { read: false })
      .pipe(plugins.rimraf());
  });

  gulp.task('coffee', function() {
    return gulp.src(paths.coffee)
      .pipe(plugins.coffee())
      .pipe(gulp.dest(paths.tmp))
      .on('error', plugins.util.log.bind(plugins.util, 'CoffeeScript Error'));
  });

  gulp.task('browserify', ['coffee'], function() {
    return browserify(path.join(paths.tmp, 'app.js'))
      .bundle()
      .pipe(source('app.js'))
      .pipe(gulp.dest(paths.out))
      .on('error', plugins.util.log.bind(plugins.util, 'Browserify Error'));
  });

  gulp.task('uglify', ['browserify'], function() {
    return gulp.src(path.join(paths.out, 'app.js'))
      .pipe(plugins.uglify())
      .pipe(gulp.dest(paths.out))
      .on('error', plugins.util.log.bind(plugins.util, 'Uglify Error'));
  });
})();
