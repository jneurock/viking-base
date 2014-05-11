var
    // An array of objects representing files to copy
    copyFiles = [
      {
        canOverride: false,
        from: 'bower_components/viking-base/.bowerrc',
        to: '.bowerrc'
      }, {
        canOverride: false,
        from: 'bower_components/viking-base/.gitignore',
        to: '.gitignore'
      }, {
        canOverride: false,
        from: 'bower_components/viking-base/404.html',
        to: '404.html'
      }, {
        canOverride: false,
        from: 'bower_components/viking-base/apple-touch-icon-precomposed.png',
        to: 'apple-touch-icon-precomposed.png'
      }, {
        canOverride: true,
        from: 'bower_components/viking-base/bower.json',
        to: 'bower.json'
      }, {
        canOverride: false,
        from: 'bower_components/viking-base/favicon.ico',
        to: 'favicon.ico'
      }, {
        canOverride: true,
        from: 'bower_components/viking-base/gulpfile.js',
        to: 'gulpfile.js'
      }, {
        canOverride: false,
        from: 'bower_components/viking-base/humans.txt',
        to: 'humans.txt'
      }, {
        canOverride: false,
        from: 'bower_components/viking-base/index.html',
        to: 'index.html'
      }, {
        canOverride: true,
        from: 'bower_components/viking-base/package.json',
        to: 'package.json'
      }, {
        canOverride: false,
        from: 'bower_components/viking-base/robots.txt',
        to: 'robots.txt'
      }, {
        canOverride: false,
        from: 'bower_components/viking-base/hbs/application.hbs',
        to: 'hbs/application.hbs'
      }, {
        canOverride: false,
        from: 'bower_components/viking-base/js/main.js',
        to: 'js/main.js',
      }, {
        canOverride: false,
        from: 'bower_components/viking-base/js/plugins.js',
        to: 'js/plugins.js'
      }, {
        canOverride: false,
        from: 'bower_components/viking-base/js/pre-app.js',
        to: 'js/pre-app.js'
      }, {
        canOverride: false,
        from: 'bower_components/viking-base/js/app/app.js',
        to: 'js/app/app.js'
      }, {
        canOverride: false,
        from: 'bower_components/viking-base/js/vendor/jquery-1.11.1.js',
        to: 'js/vendor/jquery-1.11.1.js'
      }, {
        canOverride: false,
        from: 'bower_components/viking-base/scss/style.scss',
        to: 'scss/style.scss'
      }
    ],
    // Require the file system module
    fs = require('fs'),
    i = 0,
    // An array of directories to make
    makeDirs = [
      'hbs',
      'js',
      'js/app',
      'js/vendor',
      'scss'
    ];

// Copy a file
function copyFile( copyFile ) {

  var readFile = fs.createReadStream( copyFile.from ),
      writeFile = null;

  // Try to read the source file
  readFile.on('error', function( err ) {

    console.error( err );
  });

  // Check if target file exists
  if ( copyFile.canOverride || !fs.existsSync( copyFile.to ) ) {

    writeFile = fs.createWriteStream( copyFile.to );

    // Try to create the target file
    writeFile.on('error', function( err ) {

      console.error( err );
    });

    writeFile.on('close', function( ex ) {

      console.info('  Copied: ' + copyFile.from + ' to ' + copyFile.to);
    });

    // Read the contents of the source file into the target file
    readFile.pipe( writeFile );

  } else {

    console.warn('  File exists: ' + copyFile.to + '. Did not copy.');
  }
}

console.info('Creating base project directories...');

// Create some needed folders
for ( i = 0; i < makeDirs.length; i++ ) {

  if ( !fs.existsSync( makeDirs[i] ) ) {

    fs.mkdir( makeDirs[i] );

    console.info('  ' + makeDirs[i]);

  } else {

    console.warn('  Directory exists: ' + makeDirs[i] + '. Did not create.');
  }
}

console.info('Copying scaffolding files...');

// Copy each file in the array
for ( i = 0; i < copyFiles.length; i++ ) {

  copyFile( copyFiles[i] );
}