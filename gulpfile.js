let gulp = require('gulp');
let runSequence = require('run-sequence');
let clean = require('gulp-clean');
let inject = require('gulp-inject');
let sass = require('gulp-sass');
let concat = require('gulp-concat');
let sourcemaps = require('gulp-sourcemaps');

gulp.task('build', function(done){
  runSequence('clean', 'css', 'js', 'html', done);
});

gulp.task('clean', function(){
  return gulp.src('build', {read: false})
    .pipe(clean());
});

gulp.task('css', function(){
  return gulp.src('src/scss/main.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('build/css'));
});

gulp.task('js', function(){
  return gulp.src('src/js/*.js')
    .pipe(sourcemaps.init())
    .pipe(concat('main.js'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('build/js'));
});

gulp.task('html', function(){
  let target = gulp.src('src/index.html');
  let sources = gulp.src(['build/css/*.css', 'build/js/*.js'], {read: false});

  return gulp.src('src/index.html')
    .pipe(inject(sources, {
      ignorePath: '/build'
    }))
    .pipe(gulp.dest('build/'));
});

gulp.task('default', ['build']);
