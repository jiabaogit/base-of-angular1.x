var gulp = require('gulp'),
    jsUglify = require('gulp-uglify'),
    sass = require('gulp-sass-china'),
    concat = require('gulp-concat'),
    annotate = require('gulp-ng-annotate'),
    baseUrl = 'practice-dev/app/',
    endUrl = 'practice/',
    commonJs = 'common/lib/',
    files = {
        views : baseUrl+'partials/**',
        index : baseUrl+'index.html',
        css : baseUrl+'css/**',
        img : baseUrl+'img/**',
        js : baseUrl+'js/**',
        sass : baseUrl+'sass/**',
        angular : commonJs+'angular/',
        jquery : commonJs+'jquery/',
        layer : commonJs+'layer/',
        swiper : commonJs+'swiper/',
        other : commonJs+'other/',
    }

gulp.task('common',function(){
    gulp.src(files.views)
        .pipe(gulp.dest(endUrl+'partials'));


    gulp.src(files.sass)
        .pipe(sass('compact'))
        .pipe(gulp.dest(baseUrl+'css'))
        .pipe(gulp.dest(endUrl+'css'));

    gulp.src(files.img)
        .pipe(gulp.dest(endUrl+'img'));

    gulp.src(files.index)
        .pipe(gulp.dest(endUrl));

    gulp.src(files.js)
        .pipe(annotate({add:true}))
        .pipe(jsUglify())
        .pipe(gulp.dest(endUrl+'js'));
})

gulp.task('watch',function(){
    gulp.watch(files.views,['common']);
    gulp.watch(files.index,['common']);
    gulp.watch(files.sass,['common']);
    gulp.watch(files.img,['common']);
    gulp.watch(files.js,['common']);
})
gulp.task('default',['common','watch']);
