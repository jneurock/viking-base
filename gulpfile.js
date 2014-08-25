/*
 * Viking Base registers gulp tasks for you.
 * For more information and examples see the
 * project on GitHub (https://github.com/jneurock/viking-base).
 */

var gulp = require('gulp'),
    local = null,
    plugins = require('gulp-load-plugins')(),
    vb = require('./bower_components/viking-base/node_modules/viking-base');

function build() {

  // Set module refeneces on vb object
  vb.gulp = gulp;
  vb.plugins = plugins;

  // Modify tasks as you need before calling vb.registerGulpTasks
  vb.registerGulpTasks();
}

function doBuild() {

  try {

    local = require('./viking-base');

    if ( typeof local !== 'function' ) {

      throw 'Local Viking Base file must export a function';
    }

  } catch( ex ) {

    // If no local Viking Base file, mimic the expected module output
    local = function( gulp, plugins, vb, cb ) {

      cb();
    }
  }

  local( gulp, plugins, vb, build );
}

doBuild();