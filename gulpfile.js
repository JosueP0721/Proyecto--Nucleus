const {src, dest, watch, parallel} = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const plumber = require('gulp-plumber');
const webp = require('gulp-webp');

function css (done) {
    src('src/scss/**/*.scss')
        .pipe(plumber())
        .pipe(sass())
        .pipe(dest('build/css'))

    done();
}

function convertWebp (done) {

    const options = {
        quality: 50
    }
    src('src/img/**/*.{jpg,png}')
        .pipe(webp(options))
        .pipe(dest('build/img'))

    done();
}

function dev (done) {
    watch('src/scss/**/*.scss', css);

    done();
}

exports.css = css;
exports.convertWebp = convertWebp;
exports.dev = parallel(css, convertWebp, dev);