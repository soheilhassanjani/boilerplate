const gulp = require("gulp");
const handlebars = require("gulp-compile-handlebars");
const rename = require("gulp-rename");

// pageData
const pageData = require("./src/data/index.json");

// configuration
const config = {
  path: {
    hbsFiles: "src/page/*.{html,hbs}",
    hbsPartials: "src/partials",
    hbsPartialsFiles: "src/partials/*.{html,hbs}",
    dataFiles: "src/data/index.json",
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

function taskWatch() {
  gulp.watch([config.path.hbsFiles, config.path.hbsPartialsFiles], taskHtml);
}

exports.default = gulp.series(taskHtml, taskWatch);
