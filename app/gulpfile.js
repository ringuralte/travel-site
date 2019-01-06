var gulp = require("gulp"),
  watch = require("gulp-watch"),
  postcss = require("gulp-postcss"),
  autoprefixer = require("autoprefixer"),
  cssvars = require("postcss-simple-vars"),
  nested = require("postcss-nested"),
  cssImport = require("postcss-import"),
  browserSync = require("browser-sync").create(),
  mixins = require("postcss-mixins");

gulp.task("styles", function() {
  return gulp
    .src("./assets/styles/*.css")
    .pipe(postcss([cssImport, mixins, cssvars, nested, autoprefixer]))
    .pipe(gulp.dest("./temp/styles"))
    .pipe(browserSync.stream());
});

gulp.task("watch", function() {
  browserSync.init({
    server: {
      baseDir: "./"
    }
  });

  gulp.watch("./assets/styles/**/*.css", gulp.series("styles"));

  gulp.watch("./index.html").on("change", browserSync.reload);
});
