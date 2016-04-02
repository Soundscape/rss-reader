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

  paths.assets = [path.join(paths.src, 'assets/**/*.*')];
  paths.babel = [path.join(paths.src, '**/*.js')];
  paths.scss = [path.join(paths.src, '**/*.scss')];
  paths.jade = [path.join(paths.src, '**/*.jade')];

  var watch = function () {
    gulp.watch(paths.coffee, ['uglify']);
    gulp.watch(paths.babel, ['uglify']);
    gulp.watch(paths.jade, ['minify-html'])
    gulp.watch(paths.scss, ['minify-css']);
  };

  gulp.task('watch', ['build'], watch);

  gulp.task('sync', ['build'], function() {
    browserSync.init({
      server: {
        baseDir: paths.out
      }
    });

    watch();

    gulp.watch([
      path.join(paths.out, '**/*.html'),
      path.join(paths.out, '**/*.js')
    ]).on('change', browserSync.reload);
  });

  gulp.task('build', plugins.sequence('clean-out', ['uglify', 'minify-css', 'minify-html', 'assets'], 'clean-tmp'));

  gulp.task('clean', ['clean-out', 'clean-tmp']);

  gulp.task('clean-out', function() {
    return gulp.src([path.join(paths.out, '**/*.*'), paths.out], { read: false })
      .pipe(plugins.rimraf());
  });

  gulp.task('clean-tmp', function() {
    return gulp.src([path.join(paths.tmp, '**/*.*'), paths.tmp], { read: false })
      .pipe(plugins.rimraf());
  });

  // Asset tasks
  gulp.task('assets', function() {
    return gulp.src(paths.assets)
      .pipe(gulp.dest(path.join(paths.out, 'assets')))
      .on('error', plugins.util.log.bind(plugins.util, 'Asset Error'));
  });

  // Script tasks
  gulp.task('babel', function() {
    return gulp.src(paths.babel)
      .pipe(plugins.babel({
        presets: ['es2015']
      }))
      .pipe(gulp.dest(paths.tmp))
      .on('error', plugins.util.log.bind(plugins.util, 'Babel Error'));
  });

  gulp.task('browserify', ['babel'], function() {
    return browserify(path.join(paths.tmp, 'app.js'))
      .bundle()
      .pipe(source('app.js'))
      .pipe(gulp.dest(paths.out))
      .on('error', plugins.util.log.bind(plugins.util, 'Browserify Error'));
  });

  gulp.task('uglify', ['browserify'], function() {
    return gulp.src(path.join(paths.out, 'app.js'))
      .pipe(plugins.sourcemaps.init())
      .pipe(plugins.uglify())
      .pipe(plugins.sourcemaps.write())
      .pipe(gulp.dest(paths.out))
      .on('error', plugins.util.log.bind(plugins.util, 'Uglify Error'));
  });

  // SCSS tasks
  gulp.task('scss', function() {
    return gulp.src(paths.scss)
      .pipe(plugins.sass({
          includePaths: ['css'],
          onError: browserSync.notify
      }))
      .pipe(plugins.autoprefixer(['last 5 versions', '> 1%', 'ie 8'], { cascade: true }))
      .pipe(gulp.dest(paths.tmp))
      .on('error', plugins.util.log.bind(plugins.util, 'SASS Error'));
  })

  gulp.task('minify-css', ['scss'], function() {
    return gulp.src(path.join(paths.tmp, '**/*.css'))
      .pipe(plugins.sourcemaps.init())
      .pipe(plugins.cleanCss({ compatibility: 'ie8' }))
      .pipe(plugins.sourcemaps.write())
      .pipe(gulp.dest(paths.out))
      .pipe(browserSync.stream())
      .on('error', plugins.util.log.bind(plugins.util, 'CSS Error'));
  });

  // Jade tasks
  gulp.task('jade', function() {
    return gulp.src(paths.jade)
      .pipe(plugins.jade({ pretty: true }))
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
