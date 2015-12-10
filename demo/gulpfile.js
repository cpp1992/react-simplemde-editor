var gulp = require('gulp');
var path = require('path');
var $ = require('gulp-load-plugins')();

var webpackConfig = require('./webpack.config.js');

var port = 5000;
var dist = 'dist/';


gulp.task('scripts', function() {
  return gulp.src(webpackConfig.entry)
    .pipe($.webpack(webpackConfig))
    .pipe(gulp.dest(dist + 'js/'))
    .pipe($.connect.reload());
});

gulp.task('serve', function() {
  $.connect.server({
    root: dist,
    port: port,
    livereload: {
      port: 35729
    }
  });
});

gulp.task('watch', function() {  
  gulp.watch('./scripts/**/*.js', ['scripts']);
  gulp.watch('../src/**/*.js', ['scripts']);
});

// by default build project and then watch files in order to trigger livereload
gulp.task('default', ['scripts', 'serve', 'watch']);
