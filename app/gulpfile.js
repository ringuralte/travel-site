var gulp = require('gulp'),
  watch = require('gulp-watch'),
  postcss = require('gulp-postcss'),
  autoprefixer = require('autoprefixer'),
  cssvars = require('postcss-simple-vars'),
  nested = require('postcss-nested'),
  cssImport = require('postcss-import'),
  browserSync = require('browser-sync').create(),
  mixins = require('postcss-mixins'),
  sVgSprite = require('gulp-svg-sprite')
  rename = require('gulp-rename')
  hexrgba = require('postcss-hexrgba');

var reload = browserSync.reload;

// for postcss and browserstream
gulp.task('styles', function() {
  return gulp.src('./assets/styles/*.css')
    .pipe(postcss([cssImport, mixins, cssvars, nested, hexrgba, autoprefixer]))
    .pipe(gulp.dest('./temp/styles'))
    .pipe(reload({stream:true}));
});

//browsersync stuffs
gulp.task('watch', function(){
  browserSync.init({
    server: {
      baseDir: './'
    }
  });

  gulp.watch('./assets/styles/**/*.css', gulp.series('styles'));
  gulp.watch('*.html').on('change', reload);
});

//sprite management

var config = {
  mode: {
    css: {
      render: {
        css: {
          template: './gulp/templates/sprite.css'
        }
      }
    }
  }
}
gulp.task('sprites', function() {
  return gulp.src('./assets/images/icons/**/*.svg')
    .pipe(sVgSprite(config))
    .pipe(gulp.dest('./temp/sprite'));
});

gulp.task('copySpritesCss', function() {
  return gulp.src('./temp/sprite/**/*.css')
    .pipe(rename('_sprite.css'))
    .pipe(gulp.dest('./assets/styles/modules'));
});
