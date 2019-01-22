var gulp = require('gulp'),
    connect = require('gulp-connect'),
    autoprefixer = require('gulp-autoprefixer'),
    cleanCSS = require('gulp-clean-css'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    gulpPngquant  = require('gulp-pngquant'),
    notify = require('gulp-notify'),
    gulpSequence = require('gulp-sequence'),
    del = require('del'),
    babel = require('gulp-babel')
    jshint = require('gulp-jshint');
var fs = require("fs");

var map = require("map-stream");
var customerReportText = '';
var customerReporter = map(function(file, cb){
    if(!file.jshint.success){
        file.jshint.results.forEach(function(err){
            if(err && err.file && err.file.slice(4, 7) !== 'lib'){
                customerReportText += "File '"+err.file+"' :"+err.error.line+":"+err.error.character+": error: " + err.error.reason + "\n";
            }
        });
        // process.exit(1);
        fs.writeFile('jshint.log', customerReportText, function(err) {
            if (err) { return console.error(err); }
        });
    }
});

/** product tools **/
gulp.task('min-js', async function () {
    await gulp.src('./src/**/*.js') //找到项目的 src 目录下的所有 js
        // // 将 es6 转换成 es5
        // .pipe(babel({
        //     presets: ['es2015']
        // }))
        .pipe(uglify()) //压缩
        // // 将错误信息转换成人类看的懂的语言 
        // .on('error', function (err) {
        //     gutil.log(gutil.colors.red('[Error]'), err.toString());
        // })
        // 错误检查
        .pipe(jshint())
        // .pipe(jshint.reporter('stylish'))
        .pipe(customerReporter)
        // .pipe(jshint.reporter('fail'))
        // 管道输出目录到 项目的 dist目录下
        .pipe(gulp.dest('./dist/'))
        // 每完成一个提示动作完成
        .pipe(notify({
            message: 'min-js task complete'
        }));
});
// gulp.task('min-css', () => {
//     gulp.src('./src/**/*.css')
//         // .pipe(cleanCSS({debug: true}, (details) => {
//         //     console.log(`${details.name}: ${details.stats.originalSize}`);
//         //     console.log(`${details.name}: ${details.stats.minifiedSize}`);
//         // }))
//         .pipe(cleanCSS())
//         .pipe(autoprefixer({
//             browsers: ['last 2 versions'],
//             cascade: false
//         }))
//         .pipe(gulp.dest('dist'))
//         .pipe(notify({
//             message: 'min-css task complete'
//         }));;
// });
// gulp.task('min-img', function () {
//     gulp.src('./src/**/*.{png,jpeg,jpg,gif,svg}')
//         .pipe(imagemin([
//             imagemin.gifsicle({interlaced: true}),
//             imagemin.jpegtran({progressive: true}),
//             imagemin.optipng({optimizationLevel: 5}),
//             imagemin.svgo({
//                 plugins: [{
//                     removeViewBox: false
//                 }, {
//                     cleanupIDs: false
//                 }]
//             })
//         ]))
//         // .pipe(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true }))
//         .pipe(gulp.dest('dist/'))
//         .pipe(notify({
//             message: 'min-img task complete'
//         }));;;
// });
// gulp.task('clean', function (cb) {
//     del(['./dist/css', './dist/js', './dist/images', './dist/scss', './dist'], cb)
// });
// gulp.task('build', function (cb) {
//     gulpSequence(['min-img', 'min-js', 'min-css'], cb)
// });

// /** dev tools **/
// gulp.task('serve', function () {
//     connect.server({
//         root: './app/',
//         livereload: true,
//         port: 7070
//     });
// });
// gulp.task('html', function () {
//     gulp.src('./**/*.html')
//         .pipe(connect.reload());
// });
// gulp.task('start', ['serve', 'watch']);
