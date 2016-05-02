var path = require('path');
var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var browserify = require('browserify');
var babelify = require('babelify');
var watch = require('gulp-watch');
var server = require('gulp-server-livereload');

gulp.task('build', function () {
  // set up the browserify instance on a task basis
  var b = browserify({
    entries: './src/js/presenter.js',
    debug: true,
    // defining transforms here will avoid crashing your stream
    transform: [babelify]
  });

  return b.bundle()
  .on('error', function(err) { console.error(err); this.emit('end'); })

    .pipe(source('presenter.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true}))
    // Add transformation tasks to the pipeline here.
    // .pipe(uglify())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./dist/'));
});

gulp.task('webserver', function () {
  gulp.src('.')
    .pipe(server({
      livereload: {
        enable: true,
        filter: function (filename, cb) {
          // ['./dist/**/*', '*.html']
          cb(filename.indexOf(path.join(__dirname, 'dist')) === 0 || filename.match(/\.html$/))
        }
      },
      directoryListing: true,
      // open: true
    }));
});

gulp.task('build-watch', function () {
  gulp.watch('src/**/*', ['build']);
});

gulp.task('dev-server', ['build-watch', 'webserver']);
