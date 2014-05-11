var cleanOpts = {
      docs: 'docs',
      force: {
        force: true
      },
      paths: [
        'js/templates.js',
        'publish'
      ],
      read: {
        read: false
      }
    },
    cssHash = 'style.css',
    crypto = require('crypto'),
    es = require('event-stream'),
    gulp = require('gulp'),
    jsHash = 'main.js',
    output = {
      css: 'css/',
      docs: 'docs',
      hbs: 'js',
      js: 'js/',
      jsVendor: 'js/vendor/',
      publish: 'publish/'
    },
    plugins = require('gulp-load-plugins')(),
    prod = false,
    sources = {
      hbs: 'hbs/**/*.hbs',
      html: '*.html',
      js: 'js/**/*.js',
      jsDoc: [
        'js/*.js',
        'js/app/**/*.js'
      ],
      sass: 'scss/style.scss'
    },
    util = require('util'),
    watch = false;

/*
 * Overrides gulp-htmlbuild's JavaScript preprocessor function.
 * Allows for outputting original file names instead of the
 * expected single, concatenated file name.
 */
plugins.htmlbuild.preprocess.js = function ( buildFn ) {
  
  function extractScript( line ) {

    var matched = /(\s*)<script.+src=['"]([^"']+)["']/.exec( line );

    if ( matched ) {

      return matched[2];
    }
  }
  
  return function ( block ) {

    function templateScript( path ) {

      var i = 0,
          output = '',
          template = block.indent + '<script src="%s"></script>';

      path = Array.isArray( path ) ? path : [ path ];

      for ( ; i < path.length; i++ ) {

        output += i ? '\n' : '';
        output += util.format( template, path[i] );
      }

      return output;
    }


    var extractSrc = es.mapSync( extractScript ),
        templateSrc = es.mapSync( templateScript );

    block.pipe( extractSrc );
    templateSrc.pipe( block );
    
    buildFn( es.duplex( templateSrc, extractSrc ) );
  };
};

// Hash some input value
function hash( input ) {

  return crypto.createHash('sha1').update( input ).digest('hex');
}

// Called by the gulp-htmlbuild plugin
function gulpSrc( opts, cb ) {

  var files = es.through(),
      paths = es.through();

  paths.pipe( es.writeArray(function( err, sources ) {

    if ( cb ) {

      cb( sources );
    }

    gulp.src( sources, opts )
      .pipe( files );
  }));

  return es.duplex( paths, files );
}

// Replace JavaScript output paths
function replaceJsSources( sources, vendor ) {

  var i = 0,
      files = [],
      outputPath = vendor ? output.jsVendor : output.js,
      pathSegments = [];

  for ( ; i < sources.length; i++ ) {

    pathSegments = sources[i].split('/');

    files.push( outputPath + pathSegments[ (pathSegments.length - 1) ]);
  }

  return files;
}

// Clean build output
gulp.task('clean', function() {

  return gulp.src( cleanOpts.paths, cleanOpts.read )
    .pipe( plugins.clean( cleanOpts.force ) );
});

// Clean JSDoc output
gulp.task('clean-docs', function() {

  return gulp.src( cleanOpts.docs, cleanOpts.read )
    .pipe( plugins.clean( cleanOpts.force ) );
});

// Compile Handlebars templates
gulp.task('handlebars', function() {

  return gulp.src( sources.hbs )
    .pipe( plugins.emberHandlebars({
      outputType: 'browser'
    }))
    .pipe( plugins.concat('templates.js') )
    .pipe( gulp.dest( output.hbs ) )
    .pipe( plugins.if( watch, gulp.dest( output.publish + output.js ) ) );
});

// Generate JSDoc documentation
gulp.task('js-doc', ['clean-docs'], function() {

  return gulp.src( sources.jsDoc )
    .pipe( plugins.jsdoc( output.docs ) );
});

// Compile Sass
gulp.task('sass', function() {

  return gulp.src( sources.sass )
    .pipe( plugins.sass() )
    .pipe( gulp.dest( output.publish + output.css ) );
});

// This is the main build target
gulp.task('build', ['handlebars', 'js-doc'], function() {

  gulp.src( sources.html )
    .pipe( plugins.htmlbuild({
      // Process CSS
      css: plugins.htmlbuild.preprocess.css(function( block ) {

        block
          .pipe( gulpSrc() )
          .pipe( plugins.sass() )
          .pipe( plugins.concat( cssHash ) )
          .pipe( plugins.if( prod, plugins.minifyCss() ) )
          .pipe( gulp.dest( output.publish + output.css ) );

        block.end( output.css + cssHash );
      }),
      // Process JavaScript
      js: plugins.htmlbuild.preprocess.js(function( block ) {

        if ( !prod ) {

          block
            .pipe( gulpSrc( null, function( sources ) {

              block.end( replaceJsSources( sources ) );
            }))
            .pipe( gulp.dest( output.publish + output.js ) );

        } else {

          block
            .pipe( gulpSrc() )
            .pipe( plugins.uglify() )
            .pipe( plugins.concat( jsHash ) )
            .pipe( gulp.dest( output.publish + output.js ) );

          block.end( output.js + jsHash );
        }
      }),
      // Process vendor scripts. Set output paths.
      jsvendor: plugins.htmlbuild.preprocess.js(function( block ) {

        block
          .pipe( gulpSrc( null, function( sources, true ) {

            block.end( replaceJsSources( sources ) );
          }))
          .pipe( plugins.if( prod, plugins.uglify() ) )
          .pipe( gulp.dest( output.publish + output.jsVendor ) );
      })
    }))
    .pipe( gulp.dest( output.publish ) );
});

// The dev target ensures build output is cleaned first
gulp.task('dev', ['clean'], function() {

  gulp.start('build');
});

// Sets "prod" to true and hashes some files names
gulp.task('prod', ['clean'], function() {

  var timestamp = new Date().getTime();

  prod = true;

  cssHash = hash('style-' + timestamp).substr(0, 7) + '.css';
  jsHash = hash('main-' + timestamp).substr(0, 7) + '.js';

  gulp.start('build');
});

// The watch target. Watches for Sass and Handlebars changes
gulp.task('watch', function() {

  watch = true;

  gulp.watch( sources.sass, ['sass'] );

  gulp.watch( sources.hbs, ['handlebars'] );
});

// The is what Gulp runs by default
gulp.task('default', [
  'dev',
  'watch'
]);