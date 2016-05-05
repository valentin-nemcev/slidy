const gulp = require('gulp');
const gutil = require('gulp-util');
const sourcemaps = require('gulp-sourcemaps');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const browserify = require('browserify');
const babelify = require('babelify');

const uglify = require('gulp-uglify');

require('gulp-watch');
const server = require('gulp-server-livereload');
const eslint = require('gulp-eslint');
const stylus = require('gulp-stylus');
const copy = require('gulp-copy');

gulp.task('lint', () =>
  // Be sure to return the stream from the task;
  // Otherwise, the task may end before the stream has finished.
  gulp.src(['src/**/*.js'])
    // eslint() attaches the lint output to the "eslint" property
    // of the file object so it can be used by other modules.
    .pipe(eslint())
    // eslint.format() outputs the lint results to the console.
    // Alternatively use eslint.formatEach() (see Docs).
    .pipe(eslint.format())
    // To have the process exit with an error code (1) on
    // lint error, return the stream and pipe to failAfterError last.
    .pipe(eslint.failAfterError())
);


gulp.task('build-js', () => {
  // set up the browserify instance on a task basis
  const b = browserify({
    entries: './src/js/slidy.js',
    debug: true,
    // defining transforms here will avoid crashing your stream
    transform: [babelify],
  });

  return b.bundle()
    .on('error', function (error) { gutil.log(error); this.emit('end'); })

    .pipe(source('slidy.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(uglify())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./dist/'));
});

gulp.task('build-css', () =>
  gulp.src('./src/css/slidy.styl')
    .pipe(sourcemaps.init())
    .pipe(stylus({compress: true}))
    .on('error', function (error) { gutil.log(error); this.emit('end'); })
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./dist/'))
);

gulp.task('build-html', () =>
  gulp.src('./content/*.html')
    .pipe(copy('./dist/', {prefix: 1}))
);

gulp.task('webserver', () =>
  gulp.src('dist')
    .pipe(server({
      host: '0.0.0.0', // !!! Open to whole network !!!
      livereload: true,
      directoryListing: false,
      // open: true
    }))
);

gulp.task('build', ['build-js', 'build-css', 'build-html']);


gulp.task(
  'build-watch',
  () => gulp.watch(['src/**/*', 'content/**/*'], ['build'])
);

gulp.task('dev-server', ['build-watch', 'webserver']);
