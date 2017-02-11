import path from "path";
import gulp from "gulp";
import eslint from "gulp-eslint";
import excludeGitignore from "gulp-exclude-gitignore";
import sourceMaps from "gulp-sourcemaps";
import mocha from "gulp-mocha";
import istanbul from "gulp-istanbul";
import nsp from "gulp-nsp";
import plumber from "gulp-plumber";
import coveralls from "gulp-coveralls";
import babel from "gulp-babel";
import del from "del";
import {Instrumenter} from "isparta";

const paths = {
  "es6": ["./lib/**/*.js"],
  "es5": "./dist",
  // Must be absolute or relative to source map
  "sourceRoot": path.join(__dirname, "lib")
};

// Initialize the babel transpiler so ES2015 files gets compiled
// when they"re loaded
require("babel-register");

gulp.task("static", function () {
  return gulp.src(["lib/**/*.js", "test/**/*.js"])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

gulp.task("nsp", function (cb) {
  nsp({package: path.resolve("package.json")}, cb);
});

gulp.task("pre-test", () => {
  return gulp.src(["lib/**/*.js", "test/**/*.js"])
    .pipe(excludeGitignore())
    .pipe(istanbul({
      includeUntested: true,
      instrumenter: Instrumenter
    }))
    .pipe(istanbul.hookRequire());
});

gulp.task("test", ["pre-test"], (cb) => {
  var mochaErr;

  gulp.src("test/**/*.js")
    .pipe(plumber())
    .pipe(mocha({reporter: "spec"}))
    .on("error", function (err) {
      mochaErr = err;
    })
    .pipe(istanbul.writeReports())
    .on("end", function () {
      cb(mochaErr);
    });
});

gulp.task("watch", ["babel"], () => {
  gulp.watch(["lib/**/*.js", "test/**"], ["babel"]);
});

gulp.task("coveralls", ["test"], () => {
  if (!process.env.CI) {
    return;
  }

  return gulp.src(path.join(__dirname, "coverage/lcov.info"))
    .pipe(coveralls());
});

gulp.task("babel", ["clean"], () => {
  return gulp.src("lib/**/*.js")
    .pipe(sourceMaps.init())
    .pipe(babel({
      presets: ["es2015"]
    }))
    .pipe(sourceMaps.write(".", { sourceRoot: paths.sourceRoot }))
    .pipe(gulp.dest("dist"));
});

gulp.task("clean", () => {
  return del("dist");
});

gulp.task("prepublish", ["nsp", "babel"]);
gulp.task("default", ["static", "babel", "coveralls"]);
