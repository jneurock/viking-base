/*
 * Viking Base registers gulp tasks for you.
 * The gulp tasks are defined in a simple hash.
 * More tasks can be added or existing tasks can be modified.
 * The task hash looks like:
 * {
 *   myTask: {
 *     callback: function() {
 *
 *       return gulp.src()
 *         .pipe( gulp.dest() ); 
 *     },
 *     depends: ['']
 *   }
 * }
 *
 * The property name added to the hash will serve as the task name.
 * Dependencies can be added or changed by specifying an array of 
 * strings that match task names.
 * The callback specifies what gulp should do.
 *
 * Modify tasks as you need before calling vb.registerGulpTasks.
 *
 * To see the hash of configurable options, refer to:
 * bower_components/viking-base/node_modules/viking-base/index.js
 */

var es = require('event-stream'),
    gulp = require('gulp'),
    plugins = require('gulp-load-plugins')(),
    vb = require('./bower_components/viking-base/node_modules/viking-base');

// Set module refeneces on vb object
vb.es = es;
vb.gulp = gulp;
vb.plugins = plugins;

// Modify tasks here

// Call vb.registerGulpTasks after you've made any task modifications
vb.registerGulpTasks();