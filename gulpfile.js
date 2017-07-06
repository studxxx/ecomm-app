'use strict';

// sass compile
var gulp = require('gulp');
var sass = require('gulp-sass');
var prettify = require('gulp-prettify');
var minifyCss = require("gulp-minify-css");
var concatCss = require('gulp-concat-css');
var rename = require("gulp-rename");
var uglify = require("gulp-uglify");
var rtlcss = require("gulp-rtlcss");
var connect = require('gulp-connect');

//*** Localhost server tast
gulp.task('localhost', function () {
    connect.server();
});

gulp.task('localhost-live', function () {
    connect.server({
        livereload: true
    });
});

//*** SASS compiler task
gulp.task('sass', function () {
    // bootstrap compilation
    gulp.src('./sass/bootstrap.scss').pipe(sass()).pipe(gulp.dest('./assets/global/plugins/bootstrap/css/'));

    // select2 compilation using bootstrap variables
    gulp.src('./assets/global/plugins/select2/sass/select2-bootstrap.min.scss').pipe(sass({outputStyle: 'compressed'})).pipe(gulp.dest('./assets/global/plugins/select2/css/'));

    // global theme stylesheet compilation
    gulp.src('./sass/global/*.scss').pipe(sass()).pipe(gulp.dest('./assets/global/css'));
    gulp.src('./sass/apps/*.scss').pipe(sass()).pipe(gulp.dest('./assets/apps/css'));
    gulp.src('./sass/pages/*.scss').pipe(sass()).pipe(gulp.dest('./assets/pages/css'));

    // theme layouts compilation
    gulp.src('./sass/layouts/layout/*.scss').pipe(sass()).pipe(gulp.dest('./assets/layouts/layout/css'));
    gulp.src('./sass/layouts/layout/themes/*.scss').pipe(sass()).pipe(gulp.dest('./assets/layouts/layout/css/themes'));

    gulp.src('./sass/layouts/layout2/*.scss').pipe(sass()).pipe(gulp.dest('./assets/layouts/layout2/css'));
    gulp.src('./sass/layouts/layout2/themes/*.scss').pipe(sass()).pipe(gulp.dest('./assets/layouts/layout2/css/themes'));

    gulp.src('./sass/layouts/layout3/*.scss').pipe(sass()).pipe(gulp.dest('./assets/layouts/layout3/css'));
    gulp.src('./sass/layouts/layout3/themes/*.scss').pipe(sass()).pipe(gulp.dest('./assets/layouts/layout3/css/themes'));

    gulp.src('./sass/layouts/layout4/*.scss').pipe(sass()).pipe(gulp.dest('./assets/layouts/layout4/css'));
    gulp.src('./sass/layouts/layout4/themes/*.scss').pipe(sass()).pipe(gulp.dest('./assets/layouts/layout4/css/themes'));

    gulp.src('./sass/layouts/layout5/*.scss').pipe(sass()).pipe(gulp.dest('./assets/layouts/layout5/css'));

    gulp.src('./sass/layouts/layout6/*.scss').pipe(sass()).pipe(gulp.dest('./assets/layouts/layout6/css'));

    gulp.src('./sass/layouts/layout7/*.scss').pipe(sass()).pipe(gulp.dest('./assets/layouts/layout7/css'));
});

//*** SASS watch(realtime) compiler task
gulp.task('sass:watch', function () {
    gulp.watch('./sass/**/*.scss', ['sass']);
});

//*** CSS & JS minify task
gulp.task('minify', function () {
    // css minify 
    gulp.src(['./assets/apps/css/*.css', '!./assets/apps/css/*.min.css'])
        .pipe(minifyCss()).pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('./assets/apps/css/'));

    gulp.src(['./assets/global/css/*.css', '!./assets/global/css/*.min.css']).pipe(minifyCss()).pipe(rename({suffix: '.min'})).pipe(gulp.dest('./assets/global/css/'));
    gulp.src(['./assets/pages/css/*.css', '!./assets/pages/css/*.min.css']).pipe(minifyCss()).pipe(rename({suffix: '.min'})).pipe(gulp.dest('./assets/pages/css/'));

    gulp.src(['./assets/layouts/**/css/*.css', '!./assets/layouts/**/css/*.min.css']).pipe(rename({suffix: '.min'})).pipe(minifyCss()).pipe(gulp.dest('./assets/layouts/'));
    gulp.src(['./assets/layouts/**/css/**/*.css', '!./assets/layouts/**/css/**/*.min.css']).pipe(rename({suffix: '.min'})).pipe(minifyCss()).pipe(gulp.dest('./assets/layouts/'));

    gulp.src(['./assets/global/plugins/bootstrap/css/*.css', '!./assets/global/plugins/bootstrap/css/*.min.css']).pipe(minifyCss()).pipe(rename({suffix: '.min'})).pipe(gulp.dest('./assets/global/plugins/bootstrap/css/'));

    //js minify
    gulp.src(['./assets/apps/scripts/*.js', '!./assets/apps/scripts/*.min.js']).pipe(uglify()).pipe(rename({suffix: '.min'})).pipe(gulp.dest('./assets/apps/scripts/'));
    gulp.src(['./assets/global/scripts/*.js', '!./assets/global/scripts/*.min.js']).pipe(uglify()).pipe(rename({suffix: '.min'})).pipe(gulp.dest('./assets/global/scripts'));
    gulp.src(['./assets/pages/scripts/*.js', '!./assets/pages/scripts/*.min.js']).pipe(uglify()).pipe(rename({suffix: '.min'})).pipe(gulp.dest('./assets/pages/scripts'));
    gulp.src(['./assets/layouts/**/scripts/*.js', '!./assets/layouts/**/scripts/*.min.js']).pipe(uglify()).pipe(rename({suffix: '.min'})).pipe(gulp.dest('./assets/layouts/'));
});

gulp.task('build', function () {
    // global
    gulp.src(['./assets/global/css/components.css', './assets/global/css/plugins.css']).pipe(concatCss('main.css')).pipe(minifyCss()).pipe(rename({suffix: '.min'})).pipe(gulp.dest('./dist/css/'));
    gulp.src(['./assets/global/css/components-rounded.css', './assets/global/css/plugins.css']).pipe(concatCss('main-rounded.css')).pipe(minifyCss()).pipe(rename({suffix: '.min'})).pipe(gulp.dest('./dist/css/'));
    gulp.src(['./assets/global/css/components-md.css', './assets/global/css/plugins-md.css']).pipe(concatCss('main-md.css')).pipe(minifyCss()).pipe(rename({suffix: '.min'})).pipe(gulp.dest('./dist/css/'));
    // layout
    gulp.src(['./assets/layouts/layout/css/layout.css', './assets/layouts/layout/css/themes/darkblue.css', './assets/layouts/layout/css/custom.css']).pipe(concatCss('style.darkblue.css')).pipe(minifyCss()).pipe(rename({suffix: '.min'})).pipe(gulp.dest('./dist/css/layout'));
    gulp.src(['./assets/layouts/layout/css/layout.css', './assets/layouts/layout/css/themes/blue.css', './assets/layouts/layout/css/custom.css']).pipe(concatCss('style.blue.css')).pipe(minifyCss()).pipe(rename({suffix: '.min'})).pipe(gulp.dest('./dist/css/layout'));
    gulp.src(['./assets/layouts/layout/css/layout.css', './assets/layouts/layout/css/themes/default.css', './assets/layouts/layout/css/custom.css']).pipe(concatCss('style.css')).pipe(minifyCss()).pipe(rename({suffix: '.min'})).pipe(gulp.dest('./dist/css/layout'));
    gulp.src(['./assets/layouts/layout/css/layout.css', './assets/layouts/layout/css/themes/grey.css', './assets/layouts/layout/css/custom.css']).pipe(concatCss('style.grey.css')).pipe(minifyCss()).pipe(rename({suffix: '.min'})).pipe(gulp.dest('./dist/css/layout'));
    gulp.src(['./assets/layouts/layout/css/layout.css', './assets/layouts/layout/css/themes/light.css', './assets/layouts/layout/css/custom.css']).pipe(concatCss('style.light.css')).pipe(minifyCss()).pipe(rename({suffix: '.min'})).pipe(gulp.dest('./dist/css/layout'));
    gulp.src(['./assets/layouts/layout/css/layout.css', './assets/layouts/layout/css/themes/light2.css', './assets/layouts/layout/css/custom.css']).pipe(concatCss('style.light2.css')).pipe(minifyCss()).pipe(rename({suffix: '.min'})).pipe(gulp.dest('./dist/css/layout'));
    // layout2
    gulp.src(['./assets/layouts/layout2/css/layout.css', './assets/layouts/layout2/css/themes/blue.css', './assets/layouts/layout2/css/custom.css']).pipe(concatCss('style.blue.css')).pipe(minifyCss()).pipe(rename({suffix: '.min'})).pipe(gulp.dest('./dist/css/layout2'));
    gulp.src(['./assets/layouts/layout2/css/layout.css', './assets/layouts/layout2/css/themes/dark.css', './assets/layouts/layout2/css/custom.css']).pipe(concatCss('style.dark.css')).pipe(minifyCss()).pipe(rename({suffix: '.min'})).pipe(gulp.dest('./dist/css/layout2'));
    gulp.src(['./assets/layouts/layout2/css/layout.css', './assets/layouts/layout2/css/themes/default.css', './assets/layouts/layout2/css/custom.css']).pipe(concatCss('style.css')).pipe(minifyCss()).pipe(rename({suffix: '.min'})).pipe(gulp.dest('./dist/css/layout2'));
    gulp.src(['./assets/layouts/layout2/css/layout.css', './assets/layouts/layout2/css/themes/grey.css', './assets/layouts/layout2/css/custom.css']).pipe(concatCss('style.grey.css')).pipe(minifyCss()).pipe(rename({suffix: '.min'})).pipe(gulp.dest('./dist/css/layout2'));
    gulp.src(['./assets/layouts/layout2/css/layout.css', './assets/layouts/layout2/css/themes/light.css', './assets/layouts/layout2/css/custom.css']).pipe(concatCss('style.light.css')).pipe(minifyCss()).pipe(rename({suffix: '.min'})).pipe(gulp.dest('./dist/css/layout2'));
    // layout3
    gulp.src(['./assets/layouts/layout3/css/layout.css', './assets/layouts/layout3/css/themes/blue-hoki.css', './assets/layouts/layout3/css/custom.css']).pipe(concatCss('style.blue-hoki.css')).pipe(minifyCss()).pipe(rename({suffix: '.min'})).pipe(gulp.dest('./dist/css/layout3'));
    gulp.src(['./assets/layouts/layout3/css/layout.css', './assets/layouts/layout3/css/themes/blue-steel.css', './assets/layouts/layout3/css/custom.css']).pipe(concatCss('style.blue-steel.css')).pipe(minifyCss()).pipe(rename({suffix: '.min'})).pipe(gulp.dest('./dist/css/layout3'));
    gulp.src(['./assets/layouts/layout3/css/layout.css', './assets/layouts/layout3/css/themes/default.css', './assets/layouts/layout3/css/custom.css']).pipe(concatCss('style.css')).pipe(minifyCss()).pipe(rename({suffix: '.min'})).pipe(gulp.dest('./dist/css/layout3'));
    gulp.src(['./assets/layouts/layout3/css/layout.css', './assets/layouts/layout3/css/themes/green-haze.css', './assets/layouts/layout3/css/custom.css']).pipe(concatCss('style.green-haze.css')).pipe(minifyCss()).pipe(rename({suffix: '.min'})).pipe(gulp.dest('./dist/css/layout3'));
    gulp.src(['./assets/layouts/layout3/css/layout.css', './assets/layouts/layout3/css/themes/purple-plum.css', './assets/layouts/layout3/css/custom.css']).pipe(concatCss('style.purple-plum.css')).pipe(minifyCss()).pipe(rename({suffix: '.min'})).pipe(gulp.dest('./dist/css/layout3'));
    gulp.src(['./assets/layouts/layout3/css/layout.css', './assets/layouts/layout3/css/themes/purple-studio.css', './assets/layouts/layout3/css/custom.css']).pipe(concatCss('style.purple-studio.css')).pipe(minifyCss()).pipe(rename({suffix: '.min'})).pipe(gulp.dest('./dist/css/layout3'));
    gulp.src(['./assets/layouts/layout3/css/layout.css', './assets/layouts/layout3/css/themes/red-intense.css', './assets/layouts/layout3/css/custom.css']).pipe(concatCss('style.red-intense.css')).pipe(minifyCss()).pipe(rename({suffix: '.min'})).pipe(gulp.dest('./dist/css/layout3'));
    gulp.src(['./assets/layouts/layout3/css/layout.css', './assets/layouts/layout3/css/themes/red-sunglo.css', './assets/layouts/layout3/css/custom.css']).pipe(concatCss('style.red-sunglo.css')).pipe(minifyCss()).pipe(rename({suffix: '.min'})).pipe(gulp.dest('./dist/css/layout3'));
    gulp.src(['./assets/layouts/layout3/css/layout.css', './assets/layouts/layout3/css/themes/yellow-crusta.css', './assets/layouts/layout3/css/custom.css']).pipe(concatCss('style.yellow-crusta.css')).pipe(minifyCss()).pipe(rename({suffix: '.min'})).pipe(gulp.dest('./dist/css/layout3'));
    gulp.src(['./assets/layouts/layout3/css/layout.css', './assets/layouts/layout3/css/themes/yellow-orange.css', './assets/layouts/layout3/css/custom.css']).pipe(concatCss('style.yellow-orange.css')).pipe(minifyCss()).pipe(rename({suffix: '.min'})).pipe(gulp.dest('./dist/css/layout3'));
    // layout4
    gulp.src(['./assets/layouts/layout4/css/layout.css', './assets/layouts/layout4/css/themes/default.css', './assets/layouts/layout4/css/custom.css']).pipe(concatCss('style.css')).pipe(minifyCss()).pipe(rename({suffix: '.min'})).pipe(gulp.dest('./dist/css/layout4'));
    gulp.src(['./assets/layouts/layout4/css/layout.css', './assets/layouts/layout4/css/themes/light.css', './assets/layouts/layout4/css/custom.css']).pipe(concatCss('style.light.css')).pipe(minifyCss()).pipe(rename({suffix: '.min'})).pipe(gulp.dest('./dist/css/layout4'));
    // layout5
    gulp.src(['./assets/layouts/layout5/css/layout.css', './assets/layouts/layout5/css/custom.css']).pipe(concatCss('style.css')).pipe(minifyCss()).pipe(rename({suffix: '.min'})).pipe(gulp.dest('./dist/css/layout5'));
    // layout6
    gulp.src(['./assets/layouts/layout6/css/layout.css', './assets/layouts/layout6/css/custom.css']).pipe(concatCss('style.css')).pipe(minifyCss()).pipe(rename({suffix: '.min'})).pipe(gulp.dest('./dist/css/layout6'));
    // layout7
    gulp.src(['./assets/layouts/layout7/css/layout.css', './assets/layouts/layout7/css/custom.css']).pipe(concatCss('style.css')).pipe(minifyCss()).pipe(rename({suffix: '.min'})).pipe(gulp.dest('./dist/css/layout7'));
});

//*** RTL convertor task
gulp.task('rtlcss', function () {

    gulp
        .src(['./assets/apps/css/*.css', '!./assets/apps/css/*-rtl.min.css', '!./assets/apps/css/*-rtl.css', '!./assets/apps/css/*.min.css'])
        .pipe(rtlcss())
        .pipe(rename({suffix: '-rtl'}))
        .pipe(gulp.dest('./assets/apps/css'));

    gulp
        .src(['./assets/pages/css/*.css', '!./assets/pages/css/*-rtl.min.css', '!./assets/pages/css/*-rtl.css', '!./assets/pages/css/*.min.css'])
        .pipe(rtlcss())
        .pipe(rename({suffix: '-rtl'}))
        .pipe(gulp.dest('./assets/pages/css'));

    gulp
        .src(['./assets/global/css/*.css', '!./assets/global/css/*-rtl.min.css', '!./assets/global/css/*-rtl.css', '!./assets/global/css/*.min.css'])
        .pipe(rtlcss())
        .pipe(rename({suffix: '-rtl'}))
        .pipe(gulp.dest('./assets/global/css'));

    gulp
        .src(['./assets/layouts/**/css/*.css', '!./assets/layouts/**/css/*-rtl.css', '!./assets/layouts/**/css/*-rtl.min.css', '!./assets/layouts/**/css/*.min.css'])
        .pipe(rtlcss())
        .pipe(rename({suffix: '-rtl'}))
        .pipe(gulp.dest('./assets/layouts'));

    gulp
        .src(['./assets/layouts/**/css/**/*.css', '!./assets/layouts/**/css/**/*-rtl.css', '!./assets/layouts/**/css/**/*-rtl.min.css', '!./assets/layouts/**/css/**/*.min.css'])
        .pipe(rtlcss())
        .pipe(rename({suffix: '-rtl'}))
        .pipe(gulp.dest('./assets/layouts'));

    gulp
        .src(['./assets/global/plugins/bootstrap/css/*.css', '!./assets/global/plugins/bootstrap/css/*-rtl.css', '!./assets/global/plugins/bootstrap/css/*.min.css'])
        .pipe(rtlcss())
        .pipe(rename({suffix: '-rtl'}))
        .pipe(gulp.dest('./assets/global/plugins/bootstrap/css'));
});

//*** HTML formatter task
gulp.task('prettify', function () {

    gulp.src('./**/*.html').pipe(prettify({
        indent_size: 4,
        indent_inner_html: true,
        unformatted: ['pre', 'code']
    })).pipe(gulp.dest('./'));
});