var gulp = require('gulp'),
  watch = require('gulp-watch'),
  postcss = require('gulp-postcss'),
  autoprefixer = require('autoprefixer'),
  cssvars = require('postcss-simple-vars'),
  nested = require('postcss-nested'),
  cssImport = require('postcss-import'),
  browserSync = require('browser-sync').create(),
  mixins = require('postcss-mixins'),
  sVgSprite = require('gulp-svg-sprite'),
  rename = require('gulp-rename'),
  hexrgba = require('postcss-hexrgba'),
  webpack = require('webpack'),
  imagemin = require('gulp-imagemin'),
  del = require('del'),
  usemin = require('gulp-usemin'),
  rev = require('gulp-rev'),
  cssnano = require('gulp-cssnano'),
  uglify = require('gulp-uglify');

var reload = browserSync.reload;

// for postcss and browserstream
gulp.task('styles', function() {
  return gulp.src('./app/assets/styles/*.css')
    .pipe(postcss([cssImport, mixins, cssvars, nested, hexrgba, autoprefixer]))
    .pipe(gulp.dest('./app/temp/styles'))
    .pipe(reload({stream:true}));
});

//browsersync stuffs
gulp.task('watch', function(){
  browserSync.init({
    server: {
      baseDir: 'app'
    }
  });

  gulp.watch('./app/assets/styles/**/*.css', gulp.series('styles'));
  gulp.watch('./app/*.html').on('change', reload);
  gulp.watch('./app/assets/scripts/**/*.js', gulp.series('scripts'));
  gulp.watch('./app/assets/scripts/**/*.js').on('change', reload);
});

//sprite management
//
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
};

gulp.task('beginClean', () => del(['./temp/sprite', './assets/images/sprites']));

gulp.task('sprites', function() {
  return gulp.src('./app/assets/images/icons/**/*.svg')
    .pipe(sVgSprite(config))
    .pipe(gulp.dest('./app/temp/sprite/'));
});

gulp.task('copySpritesCss', function() {
  return gulp.src('./app/temp/sprite/**/*.css')
    .pipe(rename('_sprite.css'))
    .pipe(gulp.dest('./app/assets/styles/modules'));
});

gulp.task('copySpriteGraphic', () => gulp.src('./app/temp/sprite/css/**/*.svg')
  .pipe(gulp.dest('./app/assets/images/sprites')));

gulp.task('endClean', () => del('./app/temp/sprite'));

gulp.task('icons', gulp.series('beginClean', 'sprites', 'copySpriteGraphic', 'copySpritesCss', 'endClean'));

//javascript part
gulp.task('scripts', function(callback) {
  webpack(require('./webpack.config.js'), function(err, stats) {
    if(err) {
      console.log(err.toString());
    }
    console.log(stats.toString());
    callback();
  });
});

gulp.task('deleteDistFolder', () => del("./docs"));

//optimize to build
gulp.task('optimizeImages', function() {
  return gulp.src(['./app/assets/images/**/*', '!./app/assets/images/icons', '!./app/assets/images/icons/**/*'])
    .pipe(imagemin({
      progressive: true,
      interlaced: true,
      multipass: true
    }))
    .pipe(gulp.dest("./docs/assets/images"));
});

gulp.task('usemin', () => gulp.src('./app/index.html')
  .pipe(usemin({
    css: [() => {return rev()}, () => {return cssnano()}],
    js: [() => {return rev()}],
  }))
  .pipe(gulp.dest('./docs')));

gulp.task('build', gulp.series('icons', 'deleteDistFolder','optimizeImages', 'usemin'));

gulp.task('previewDist', function() {
  browserSync.init({
    notify: false,
    server: {
      baseDir: "docs"
    }
  });
});
