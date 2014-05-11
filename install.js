var
    // An array of objects representing files to copy
    copyFiles = [{
      from: 'bower_components/viking-base/example-.gitignore',
      to: '.gitignore'
    }, {
      from: 'bower_components/viking-base/example-404.html',
      to: '404.html'
    }, {
      from: 'bower_components/viking-base/example-index.html',
      to: 'index.html'
    }, {
      from: 'bower_components/viking-base/example-pom.xml',
      to: 'pom.xml'
    }, {
      from: 'bower_components/viking-base/example-humans.txt',
      to: 'humans.txt'
    }, {
      from: 'bower_components/viking-base/example-robots.txt',
      to: 'robots.txt'
    }, {
      from: 'bower_components/viking-base/css/example-style.scss',
      to: 'css/style.scss'
    }, {
      from: 'bower_components/viking-base/img/example-apple-touch-icon-precomposed.png',
      to: 'apple-touch-icon-precomposed.png'
    }, {
      from: 'bower_components/viking-base/img/example-favicon.ico',
      to: 'favicon.ico'
    }, {
      from: 'bower_components/viking-base/js/example-main.js',
      to: 'js/main.js',
    }, {
      from: 'bower_components/viking-base/js/example-plugins.js',
      to: 'js/plugins.js'
    }, {
      from: 'bower_components/viking-base/js/example-pre-app.js',
      to: 'js/pre-app.js'
    }, {
      from: 'bower_components/viking-base/js/example-templates/example-application.hbs',
      to: 'js/templates/application.hbs'
    }, {
      from: 'bower_components/viking-base/js/example-app.js',
      to: 'js/app/app.js'
    }],
    // Require the file system module
    fs = require('fs'),
    i = 0,
    // An array of directories to make
    makeDirs = [
      'css',
      'js',
      'js/app',
      'js/templates'
    ],
    sourceFile = '',
    targetFile = '';

// Copy a file
function copyFile(source, target) {

  var readFile = fs.createReadStream(source),
      writeFile = null;

  // Try to read the source file
  readFile.on('error', function(err) {

    console.error(err);
  });

  // Check if target file exists
  if (!fs.existsSync(target)) {

    writeFile = fs.createWriteStream(target);

    // Try to create the target file
    writeFile.on('error', function(err) {

      console.error(err);
    });

    writeFile.on('close', function(ex) {

      console.info('  Copied: ' + source + ' to ' + target);
    });

    // Read the contents of the source file into the target file
    readFile.pipe(writeFile);

  } else {

    console.warn('  File exists: ' + target + '. Did not copy.');
  }
}

console.info('Creating base project directories...');

// Create some needed folders
for (i = 0; i < makeDirs.length; i++) {

  if (!fs.existsSync(makeDirs[i])) {

    fs.mkdir(makeDirs[i]);

    console.info('  ' + makeDirs[i]);

  } else {

    console.warn('  Directory exists: ' + makeDirs[i] + '. Did not create.');
  }
}

console.info('Copying example files...');

// Copy each file in the array
for (i = 0; i < copyFiles.length; i++) {

  sourceFile = copyFiles[i].from;
  targetFile = copyFiles[i].to;

  copyFile(sourceFile, targetFile);
}