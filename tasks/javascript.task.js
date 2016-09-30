'use strict';

const eslint = require('gulp-eslint');
const rev = require('gulp-rev');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const babel = require('gulp-babel');
const gutil = require('gulp-util');
const config = require('./config');
const browsersync = require('./browsersync.task').browsersync;

module.exports = gulp => {

  // -- Unit script tasks

  gulp.task('build-javascript', () => {
    return gulp.src(config.es)
      .pipe(eslint())
      .pipe(eslint.format())
      .pipe(babel())
      .pipe(concat('app.js'))
      .pipe(gulp.dest(config.dist+'/js/'))
      .pipe(browsersync.stream());
  });

  gulp.task('build-javascript:prod', () => {
    return gulp.src(config.es)
      .pipe(babel())
      .pipe(concat('app.min.js'))
      .pipe(uglify())
      .pipe(rev())
      .pipe(gulp.dest(config.dist+'/js/'));
  });

  // -- Main script tasks
  
  gulp.task('javascript', ['build-javascript'], () => {
    gulp.watch(config.es, ['build-javascript']);

    return gutil.log('Task for serving scripts in developer mode.');
  });

  gulp.task('javascript:prod', ['build-javascript:prod'], () => {
    return gutil.log('Task for building scripts in production mode.');
  });
};
