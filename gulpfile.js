var gulp = require('gulp');
var browserify = require('browserify');
var babelify = require('babelify');
var fs = require('fs');
var koaService = require('gulp-koa-service');

var postcss = require('gulp-postcss');

//generate broswer script after folder 'dist' created
gulp.task('script', ['css'], function() {
    browserify('./js/index.js')
        .transform(babelify, {
            presets: ['es2015', 'react']
        })
        .bundle()
        .pipe(fs.createWriteStream('dist/bundle.js'));
});

gulp.task('css', function() {
    return gulp.src('css/index.css')
        .pipe(postcss([require('autoprefixer'), require('precss')]))
        .pipe(gulp.dest('dist'));
});

gulp.task('font', function() {
    return gulp.src('font/*')
        .pipe(gulp.dest('dist/font'));
});

gulp.task('watch', function() {
    gulp.watch('css/**/*.css', ['css']);    
    gulp.watch('font/**/*', ['font']);
    gulp.watch('compoment/**/*', ['script']);
});

gulp.task('server', function() {
    return gulp.src('./app.js')
        .pipe(koaService({
            env: {
                'PORT': 4000
            }
        }));
});

gulp.task('default', ['css', 'font', 'script', 'server', 'watch']);