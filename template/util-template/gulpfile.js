import gulp from "gulp"
import ts from "gulp-typescript"
import clean from "gulp-clean"
import jsminfy from "gulp-uglify"
import chalk from "chalk"

const tsProject = ts.createProject('tsconfig.json');
const FOLDER = "./src"
const OUT_FOLDER = "./dist"
const TS_FILE_PATH = FOLDER + "/**/*.{ts,tsx}"
const NOT_TS_FILE_PATH = FOLDER + "/**/*.!(*ts|*tsx)"

function handlerTs () {
  let handler = gulp.src(TS_FILE_PATH).pipe(tsProject()).js
  if (process.env.NODE_ENV === 'production') {
    handler = handler.pipe(jsminfy())
  }
  return handler.pipe(gulp.dest(OUT_FOLDER))
}

function handlerNotTsFile () {
  return gulp.src(NOT_TS_FILE_PATH)
    .pipe(gulp.dest(OUT_FOLDER))
}

const cleanFolder = function () {
  return gulp.src(OUT_FOLDER, { allowEmpty: true })
    .pipe(clean())
}

const startWatch = function () {
  // 开发环境下开启监听
  if (process.env.NODE_ENV === 'development') {
    gulp.watch(TS_FILE_PATH, handlerTs)
    gulp.watch(NOT_TS_FILE_PATH, handlerNotTsFile)
    console.log(`\n${chalk.bgRed(" watch ")} start watching...\n`);
  } else {
    console.log(`\n${chalk.bgBlue(" success ")} build successful.\n`);
    // 安全退出
    return Promise.resolve()
  }
}

gulp.task('default', gulp.series(cleanFolder, handlerTs, handlerNotTsFile, startWatch));


