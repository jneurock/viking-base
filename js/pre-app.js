/**
 * Whether or not to log anything to the console
 *
 * @define {boolean} Used to determine whether or not to log anything to the console
 * @constant
 * @type {boolean}
 */
var DEBUG = true;

// Tell Ember not to log its version
if (window.Ember) {

  Ember.LOG_VERSION = false;

} else if (DEBUG) {

  console.error('Ember was not found');
}