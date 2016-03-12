(function () {
  'use strict';

  var gulp = require('gulp'),
      plugins = require('gulp-load-plugins')(),
      path = require('path'),
      browserify = require('browserify'),
      source = require('vinyl-source-stream'),
      browserSync = require('browser-sync').create();

  var paths = {
    src: './src',
    out: './out',
    tmp: './tmp'
  };

  paths.coffee = [path.join(paths.src, '**/*.coffee')];
  paths.scss = [path.join(paths.src, '**/*.scss')];
  paths.jade = [path.join(paths.src, '**/*.jade')];

  gulp.task('sync', ['build'], function() {
    browserSync.init({
      server: {
        baseDir: paths.out
      }
    });
  });

  gulp.task('build', plugins.sequence('clean-out', ['uglify', 'minify-css', 'minify-html'], 'clean-tmp'));

  gulp.task('clean', ['clean-out', 'clean-tmp']);

  gulp.task('clean-out', function() {
    return gulp.src([path.join(paths.out, '**/*.*'), paths.out], { read: false })
      .pipe(plugins.rimraf());
  });

  gulp.task('clean-tmp', function() {
    return gulp.src([path.join(paths.tmp, '**/*.*'), paths.tmp], { read: false })
      .pipe(plugins.rimraf());
  });

  // Script tasks
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

  // SCSS tasks
  gulp.task('scss', function() {
    return gulp.src(paths.scss)
      .pipe(plugins.sass())
      .pipe(gulp.dest(paths.tmp))
      .on('error', plugins.util.log.bind(plugins.util, 'SASS Error'));
  })

  gulp.task('minify-css', ['scss'], function() {
    return gulp.src(path.join(paths.tmp, '**/*.css'))
      .pipe(plugins.cleanCss({ compatibility: 'ie8' }))
      .pipe(gulp.dest(paths.out))
      .on('error', plugins.util.log.bind(plugins.util, 'CSS Error'));
  });

  // Jade tasks
  gulp.task('jade', function() {
    return gulp.src(paths.jade)
      .pipe(plugins.jade({ pretty: true }))
      //.pipe(plugins.minifyHtml({ conditionals: true, spare: true }))
      .pipe(gulp.dest(paths.tmp))
      .on('error', plugins.util.log.bind(plugins.util, 'Jade Error'));
  });

  gulp.task('minify-html', ['jade'], function() {
    return gulp.src(path.join(paths.tmp, '**/*.html'))
      .pipe(plugins.minifyHtml({ conditionals: true, spare: true }))
      .pipe(gulp.dest(paths.out))
      .on('error', plugins.util.log.bind(plugins.util, 'HTML Error'));
  });
})();
