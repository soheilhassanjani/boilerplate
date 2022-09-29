// core
const gulp = require("gulp");
const rename = require("gulp-rename");
// html
const handlebars = require("gulp-compile-handlebars");
// css
const dartSass = require("sass");
const gulpSass = require("gulp-sass");
const autoprefixer = require("autoprefixer");
const postcss = require("gulp-postcss");
const cssnano = require("cssnano");
const sass = gulpSass(dartSass);

// pageData
const pageData = require("./src/data/index.json");

// configuration
const config = {
  path: {
    hbsFiles: "src/page/*.{html,hbs}",
    hbsPartials: "src/partials",
    hbsPartialsFiles: "src/partials/*.{html,hbs}",
    dataFiles: "src/data/index.json",
    scssFiles: "src/scss/**/*.scss",
  },
};

function taskHtml() {
  const options = {
    ignorePartials: true,
    batch: [config.path.hbsPartials],
  };
  return gulp
    .src(config.path.hbsFiles)
    .pipe(handlebars(pageData, options))
    .pipe(rename({ extname: ".html" }))
    .pipe(gulp.dest("dist"));
}

function taskScss() {
  return gulp
    .src(config.path.scssFiles)
    .pipe(sass().on("error", sass.logError))
    .pipe(postcss([autoprefixer(), cssnano()]))
    .pipe(gulp.dest("dist/css"));
}

function taskWatch() {
  gulp.watch([config.path.hbsFiles, config.path.hbsPartialsFiles], taskHtml);
  gulp.watch([config.path.scssFiles], taskScss);
}

exports.default = gulp.series(taskHtml, taskScss, taskWatch);
