'use strict';

import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import browserSync from 'browser-sync';
import reporter from 'postcss-reporter';
import syntax_scss from 'postcss-scss';
import stylelint   from 'stylelint';

const $ = gulpLoadPlugins();
const reload = browserSync.reload;
const stylelintConfig = {
    "rules": {
      "block-no-empty": true,
      "color-no-invalid-hex": true,
      "declaration-colon-space-after": "always",
      "declaration-colon-space-before": "never",
      "function-comma-space-after": "always",
      "function-url-quotes": "double",
      "media-feature-colon-space-after": "always",
      "media-feature-colon-space-before": "never",
      "media-feature-name-no-vendor-prefix": true,
      "max-empty-lines": 5,
      "number-leading-zero": "never",
      "number-no-trailing-zeros": true,
      "property-no-vendor-prefix": true,
      "selector-list-comma-space-before": "never",
      "selector-list-comma-newline-after": "always",
      "selector-no-id": true,
      "string-quotes": "double",
      "value-no-vendor-prefix": true
    }
  };

const processors = [
   stylelint(stylelintConfig),
   reporter({
     clearMessages: true,
     throwError: true
   })
 ];

gulp.task('sass', () => {


  return gulp.src('dev/styles/*.scss')
    .pipe($.plumber())
    .pipe($.sassGlob())
    //.pipe($.postcss(processors, {syntax: syntax_scss}))
    .pipe($.sass.sync({
      outputStyle: 'expanded',
      precision: 10,
      includePaths: ['.', 'bower_components/']
    }).on('error', $.sass.logError))
    .pipe($.autoprefixer({browsers: ['> 1%', 'last 2 versions', 'Firefox ESR']}))
    .pipe(gulp.dest('assignment_week4'))
    .pipe(reload({stream: true}));
});

gulp.task('watch', () => {
  browserSync({
    notify: false,
    port: 9000,
    server: {
      baseDir: ['assignment_week4']
    }
  });
  gulp.watch('dev/styles/*.scss', ['sass']);
  gulp.watch('assignment_week4/*.html').on('change', reload);
});

gulp.task('default', ['sass'], () => {
  gulp.start('watch');
});
