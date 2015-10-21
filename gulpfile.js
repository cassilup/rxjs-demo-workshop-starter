var gulp = require('gulp');
var connect = require('gulp-connect');
var sass = require('gulp-sass');
var watchify = require('watchify');
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');
var runSequence = require('run-sequence');
var assign = require('lodash.assign');


// Server task
gulp.task('connect', function() {
  connect.server({
    root: __dirname,
    livereload: true
  });
});


// HTML task
gulp.task('html', function() {
  gulp.src('index.html')
    .pipe(connect.reload());
});


// SASS task
gulp.task('sass', function() {
  gulp.src('sass/**/*.scss')
    .pipe(sass())
    .on('error', function(err) {
      console.log('SASS error: ' + err.message)
    })
    .pipe(gulp.dest(__dirname))
    .pipe(connect.reload());
});


// JS
var customOpts = {
  entries: 'js/app.js',
  debug: true
};
var opts = assign({}, watchify.args, customOpts);
var b = watchify(browserify(opts).transform(babelify))
          .on('update', bundle);

function bundle() {
  return b.bundle()
    .on('error', function(err) {
      console.log('Bundle error: ' + err.message)
    })
    .pipe(source('app.js'))
    .pipe(gulp.dest(__dirname))
    .pipe(connect.reload());
}

gulp.task('js', bundle);


// Watchers
gulp.task('watch', function() {
  gulp.watch(['index.html'], ['html']);
  gulp.watch(['sass/**/*.scss'], ['sass']);
});


// Default task
gulp.task('default', function() {
  runSequence(
    ['js', 'sass'],
    'connect',
    'watch'
  );
});
