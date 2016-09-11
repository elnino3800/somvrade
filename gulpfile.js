"use strict";

var gulp = require('gulp'),
    browserSync = require('browser-sync'),
    sass = require('gulp-sass'),
    runSequence = require('run-sequence'),
    del = require('del'),
    angularTemplatecache = require('gulp-angular-templatecache'),
    useref = require('gulp-useref'),
    ngAnnotate = require('gulp-ng-annotate'),
    uglify = require('gulp-uglify'),
    rev = require('gulp-rev'),
    revReplace = require('gulp-rev-replace'),
    gulpif = require('gulp-if'),
    cleanCss = require('gulp-clean-css');

var options = {};
options.sass = {
    precision: 8,
    includePaths: ['node_modules/bootstrap-sass/assets/stylesheets']
};
var src = {
    toString: function () {
        return 'src'
    }
};
src.styles = src + '/css';
src.sass = src + '/sass/**/*.scss';
src.app = src + '/app';
src.templates = src.app + '/**/*.html';
src.fonts = src + '/fonts';
src.images = src + '/img/**/*.{gif,jpg,jpeg,png,webp}';
src.index = src + '/index.html';

var dist = {
    toString: function () {
        return 'dist'
    }
};
dist.scripts = dist + '/js';
dist.app = dist + '/app';
dist.templates = dist.app + '/templates.js';
dist.fonts = dist + '/fonts';
dist.images = dist + '/img';

gulp.task('sass', function () {
    gulp.src(src.sass)
        .pipe(sass(options.sass))
        .on('error', function (error) {
            console.error(error);
        })
        .pipe(gulp.dest(src.styles))
        .pipe(browserSync.reload({
                stream: true
            })
        );
});

gulp.task('watch', function () {
    gulp.watch(src.sass, ['sass']);
});

gulp.task('browserSync', function () {
    browserSync.init({
        server: {
            baseDir: 'src',
            routes: {
                "/node_modules": "node_modules",
                "/fonts/bootstrap": "node_modules/bootstrap-sass/assets/fonts/bootstrap"
            }
        },
        browser: [],
        reloadOnRestart: true
    })
});

gulp.task('browserSyncDist', function () {
    browserSync.init({
        server: {
            baseDir: 'dist',
            routes: {
                "/node_modules": "node_modules"
            }
        },
        browser: [],
        reloadOnRestart: true
    })
});

gulp.task('clean', function (cb) {
    return del([
        dist + '/*'
    ], cb);
});

gulp.task('html', function () {
    return gulp.src(src + '/*.html')
        .pipe(gulp.dest('' + dist));
});

gulp.task('templates', function () {
    return gulp.src(src.templates)
        .pipe(angularTemplatecache({
            module: 'app.templates',
            standalone: true,
            root: 'app'
        }))
        .pipe(gulp.dest('' + dist.app));
});

gulp.task('fonts', function () {
    return gulp.src([src.fonts + '/**', 'node_modules/bootstrap-sass/assets/fonts/**'])
        .pipe(gulp.dest(dist.fonts));
});

gulp.task('images', function () {
    return gulp.src(src.images)
        .pipe(gulp.dest(dist.images));
});

gulp.task('buildIndex', function () {

    return gulp.src(src.index)
        .pipe(useref({searchPath:['dist','src']}))
        .pipe(gulpif('*.js', ngAnnotate()))
        .pipe(gulpif('*.js', uglify()))
        .pipe(gulpif('*.js', rev()))
        .pipe(gulpif('*.css', cleanCss()))
        .pipe(gulpif('*.css', rev()))
        .pipe(revReplace())
        .pipe(gulp.dest('' + dist));
});

gulp.task('cleanBuild', function (cb) {
    return del([ dist.app ], cb);
});

gulp.task('build', function () {
    return runSequence(
        'clean',
        'sass', 'html', 'templates', 'fonts', 'images',
        'buildIndex',
        'cleanBuild'
    );
});

gulp.task('dist', ['browserSyncDist']);

gulp.task('default', ['watch', 'browserSync']);