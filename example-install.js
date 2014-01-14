var
    // An array of objects representing files to copy
    copyFiles = [{
      from: 'bower_components/viking-base/example.gitignore',
      to: '.gitignore'
    }, {
      from: 'bower_components/viking-base/example-index.html',
      to: 'index.html'
    }, {
      from: 'bower_components/viking-base/example-pom.xml',
      to: 'pom.xml'
    }, {
      from: 'bower_components/viking-base/example-robots.txt',
      to: 'robots.txt'
    }, {
      from: 'bower_components/viking-base/css/example-style.scss',
      to: 'css/style.scss'
    }, {
      from: 'bower_components/viking-base/img/example-apple-touch-icon-57x57-precomposed.png',
      to: 'img/apple-touch-icon-57x57-precomposed.png'
    }, {
      from: 'bower_components/viking-base/img/example-apple-touch-icon-72x72-precomposed.png',
      to: 'img/apple-touch-icon-72x72-precomposed.png'
    }, {
      from: 'bower_components/viking-base/img/example-apple-touch-icon-114x114-precomposed.png',
      to: 'img/apple-touch-icon-114x114-precomposed.png'
    }, {
      from: 'bower_components/viking-base/img/example-apple-touch-icon-144x144-precomposed.png',
      to: 'img/apple-touch-icon-144x144-precomposed.png'
    }, {
      from: 'bower_components/viking-base/img/example-apple-touch-icon-precomposed.png',
      to: 'img/apple-touch-icon-precomposed.png'
    }, {
      from: 'bower_components/viking-base/img/example-apple-touch-icon.png',
      to: 'img/apple-touch-icon.png'
    }, {
      from: 'bower_components/viking-base/img/example-favicon.ico',
      to: 'img/favicon.ico'
    }, {
      from: 'bower_components/viking-base/js/example-main.js',
      to: 'js/main.js'
    }, {
      from: 'bower_components/viking-base/js/example-templates/example-application.hbs',
      to: 'js/templates/application.hbs'
    }, {
      from: 'bower_components/ember-starter-kit/js/app.js',
      to: 'js/app/app.js'
    }],
    // Require the file system module
    fs = require('fs'),
    i = 0,
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
}

console.info('Creating base project directories...');

// Create some needed folders
fs.mkdir('css');
console.info('  css');

fs.mkdir('img');
console.info('  img');

fs.mkdir('js');
fs.mkdir('js/app');
fs.mkdir('js/templates');
console.info('  js, js/app, js/templates');

console.info('Copying example files...');

// Copy each file in the array
for (i = 0; i < copyFiles.length; i++) {

  sourceFile = copyFiles[i].from;
  targetFile = copyFiles[i].to;

  copyFile(sourceFile, targetFile);

  // End of loop
  if (i === copyFiles.length) {

    console.info('Your Viking Base project is now ready to build');
  }
}