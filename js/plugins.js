// Ensure window is global object
(function (global) {

  if (typeof window === 'undefined') {

    window = global;
  }

})(this);

// Avoid console errors in browsers that lack a console.
(function() {
    
  var console = window.console || {},
      i = 0,
      method = '',
      methods = [
        'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
        'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
        'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
        'timeStamp', 'trace', 'warn'
      ],
      noop = function() {},
      length = methods.length;

  window.console = window.console || console;

  for (i = 0; i < methods.length; i++) {

    method = methods[i];

    // Stub out any undefined console methods
    if (!console[method]) {

      console[method] = noop;
    }
  }
}());

// Add "capitalize" method to string class
if (!String.prototype.capitalize) {

  String.prototype.capitalize = function() {

    return this.charAt(0).toUpperCase() + this.slice(1);
  };
}

// Add "trim" method to string class
if (!String.prototype.trim) {

  String.prototype.trim = function() {

    return this.replace(/^\s+|\s+$/g, '');
  };
}