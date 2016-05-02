const path = require('path');
const gulp = require('gulp');
const gutil = require('gulp-util');
const sourcemaps = require('gulp-sourcemaps');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const browserify = require('browserify');
const babelify = require('babelify');
require('gulp-watch');
const server = require('gulp-server-livereload');

const eslint = require('gulp-eslint');

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


gulp.task('build', () => {
  // set up the browserify instance on a task basis
  const b = browserify({
    entries: './src/js/presenter.js',
    debug: true,
    // defining transforms here will avoid crashing your stream
    transform: [babelify],
  });

  return b.bundle()
  .on('error', gutil.log)

    .pipe(source('presenter.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({ loadMaps: true }))
    // Add transformation tasks to the pipeline here.
    // .pipe(uglify())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./dist/'));
});

gulp.task('webserver', () =>
  gulp.src('.')
    .pipe(server({
      livereload: {
        enable: true,
        filter(filename, cb) {
          // ['./dist/**/*', '*.html']
          cb(filename.indexOf(path.join(__dirname, 'dist')) === 0 || filename.match(/\.html$/));
        },
      },
      directoryListing: true,
      // open: true
    }))
);

gulp.task('build-watch', () => gulp.watch('src/**/*', ['build']));

gulp.task('dev-server', ['build-watch', 'webserver']);
