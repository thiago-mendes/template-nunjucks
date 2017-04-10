var gulp = require('gulp');
var gsequence = require('gulp-sequence');
var rimraf = require('rimraf');
var gutil = require('gulp-util');
var sass = require('gulp-sass');
var gsequence = require('gulp-sequence');
var autoprefixer = require('gulp-autoprefixer');
var cleanCSS = require('gulp-clean-css');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var concat = require('gulp-concat');
var versionNumber = require('gulp-version-number');
var htmlmin = require('gulp-htmlmin');
var nunjucks = require('gulp-nunjucks-render');
var browserSync = require('browser-sync').create();
var awspublish = require('gulp-awspublish');
var config = require('./gulpconfig');


// Tasks

gulp.task('clean', function(cb) {
    return rimraf(config.dirs.public, function(err) {
        if (err) {
            cb(err);
        }

        cb();
    });
});

gulp.task('vendor:stylesheets', function() {
    return gulp.src(config.paths.vendor.stylesheets)
        .pipe(concat('vendors.css'))
        .pipe(sourcemaps.init())
        .pipe(cleanCSS())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(config.dirs.public + '/assets/css'));
});

gulp.task('vendor:scripts', function() {
    return gulp.src(config.paths.vendor.scripts)
        .pipe(concat('vendors.js'))
        .pipe(uglify(config.settings.uglify))
        .pipe(gulp.dest(config.dirs.public + '/assets/js'));
});

gulp.task('project:fonts', function() {
    return gulp.src(config.paths.project.fonts)
        .pipe(gulp.dest(config.dirs.public + '/assets/fonts'));
});

gulp.task('project:images', function() {
    return gulp.src(config.paths.project.images)
        .pipe(gulp.dest(config.dirs.public + '/assets/images'));
});

gulp.task('project:json', function() {
    return gulp.src(config.paths.project.json)
        .pipe(gulp.dest(config.dirs.public + '/assets/json'));
});

gulp.task('project:stylesheets', function() {
    return gulp.src(config.paths.project.stylesheets)
        .pipe(sourcemaps.init())
        .pipe(sass(config.settings.sass))
        .pipe(sourcemaps.write())
        .pipe(autoprefixer())
        .pipe(gulp.dest(config.dirs.public + '/assets/css'))
        .pipe(browserSync.stream());
});

gulp.task('project:scripts', function() {
    return gulp.src(config.paths.project.scripts)
        .pipe(sourcemaps.init())
        .pipe(uglify(config.settings.uglify))
        .pipe(sourcemaps.write())
        .pipe(concat('main.js'))
        .pipe(gulp.dest(config.dirs.public + '/assets/js'));
});

gulp.task('pages', function() {
    return gulp.src(config.paths.project.pages)
        .pipe(nunjucks(config.settings.nunjucks).on('error', gutil.log))
        .pipe(versionNumber(config.settings.versionNumber))
        .pipe(htmlmin(config.settings.htmlmin))
        .pipe(gulp.dest('public'));
});

gulp.task('server', function() {
    browserSync.init({
        server: config.dirs.public,
        files: [config.dirs.public + '/**/*.*'],
        port: process.env.PORT || 3000,
        open: false
    });
});

gulp.task('build', gsequence(
    'clean',
    ['vendor:scripts'],
    ['project:fonts', 'project:images','project:json', 'project:stylesheets', 'project:scripts'],
    ['pages']
));

gulp.task('default', function() {
    gsequence('build', 'server')(function() {
        gulp.watch(config.paths.project.fonts, ['project:fonts']);
        gulp.watch(config.paths.project.images, ['project:images']);
        gulp.watch(config.paths.project.json, ['project:json']);
        gulp.watch(config.paths.project.stylesheets, ['project:stylesheets']);
        gulp.watch(config.paths.project.scripts, ['project:scripts']);
        gulp.watch([config.paths.project.pages, config.paths.project.templates], ['pages']);
    });
});