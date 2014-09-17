var gulp = require('gulp');
var ejs = require('gulp-ejs');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var browsersync = require('browser-sync');
var reload = browsersync.reload;

// HTML TASK
// compile ejs templates, possibly minify html in the future
gulp.task('html', function() {
  return gulp.src('src/*.ejs')
    .pipe(ejs())
    .pipe(gulp.dest('dist/'))
    .pipe(reload({stream: true}));
});

// CSS TASK
// compile sass and autoprefix it
gulp.task('css', function() {
  return gulp.src('src/style/*.scss')
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(gulp.dest('dist/css/'))
    .pipe(reload({stream: true}))
});

// IMG TASK
// move images
gulp.task('img', function() {
  return gulp.src('src/img/**')
    .pipe(gulp.dest('dist/img'))
})

// WATCH TASK
gulp.task('watch', function() {
  gulp.watch('src/*.ejs', ['html']);
  gulp.watch('src/style/*.scss', ['css']);
  gulp.watch('src/img/**', ['img']);
});

// browsersync.io
gulp.task('browsersync', function() {
  browsersync({
    server: {
      baseDir: 'dist/'
    }
  })
});


gulp.task('build', ['html', 'css', 'img']);
gulp.task('default', ['build', 'browsersync', 'watch']);