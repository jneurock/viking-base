/*
 * Viking Base registers gulp tasks for you.
 * For more information and examples see the
 * project on GitHub (https://github.com/jneurock/viking-base).
 */

var gulp = require('gulp'),
    plugins = require('gulp-load-plugins')(),
    vb = require('./bower_components/viking-base/node_modules/viking-base');

// Set module refeneces on vb object
vb.gulp = gulp;
vb.plugins = plugins;

// Modify tasks as you need before calling vb.registerGulpTasks
vb.registerGulpTasks();