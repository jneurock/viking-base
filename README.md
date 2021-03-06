# Viking Base (7.5.2)

Note: This package will probably be retired after Ember 1.13 is released. I will more than likely stop updating this when Ember 2.0 comes around.

Viking Base is an opinionated package intended to provide a solid starting point for building web applications. The package consists of several key components: Ember.js, Foundation and gulp. Viking Base leans on Bower to manage dependencies and gulp to build while providing a simple scaffolding script to get started.

Currently, the package consists of:

* Ember.js 1.13.4
* Foundation 5.5.2
* jQuery 1.11.2 (for optional IE 8 support)
* Respond 1.4.2 (for optional IE 8 support)
* REM Unit Polyfill 1.3.2 (for optional IE 8 support)

## Getting Started

Initialize a Bower package:  
`bower init`

Install the package via Bower:  
`bower install viking-base -D`

Run the install script:  
`node bower_components/viking-base/install`

Install Node.js packages:  
`npm install`

Try out the dev build:  
`gulp dev`

## Known Issues

The `gulp-htmlbars` package depends on the `ember-cli-htmlbars` package which depends on the `broccoli-filter` package. The current version of `broccoli-filter` throws an error that prevents the build from completing. To avoid this, cd into `node_modules/gulp-htmlbars/node_modules/ember-cli-htmlbars` and run `npm install broccoli-filter@0.1.6`. If you are working with a team or CI environment, consider running `npm shrinkwrap --dev` to preserve the specific version of `broccoli-filter`.

## gulp Targets

Viking Base includes three main gulp build targets: dev, prod and default. Note: default does not need to be specified. The goals of the gulp build are:

* Compile Sass
* Compile Handlebars templates
* Generate JSDoc documentation
* Output to a publish folder
* For production:
    * Minify CSS
    * Concatenate and minify JavaScript
    * Hash CSS and JavaScript ouput file names

**default**  
The `default` build runs a `dev` build first and then watches Sass and Handlebars resources for changes. There is no need to tell gulp which build to run in this case. Simply run gulp:  
`gulp`

**dev**  
The `dev` build is similar to the `prod` build except that it doesn’t minify or concatenate any resources. To run the `dev` build:  
`gulp dev`

**prod**  
The `prod` build does the same thing as the `dev` build but also concatenates and minifies CSS and JavaScript resources. The `prod` build also hashes the output file names. To run the prod build:  
`gulp prod`

**update**  
The `update` target is special in that it is intended to be used in front of other builds. For example: `gulp update dev`. This tells Viking Base that it should prune and install/update Node.js and Bower packages. This shouldn't be necessary as part of a developer's everyday workflow unless dependency updates are expected frequently. This is a great addition, however, for a CI system.  
`gulp update dev`  
`gulp update prod`

## Extending Viking Base
The method for extending Viking Base has changed slightly from version 3 to 4. In version 3, extending Viking Base meant updating `gulpfile.js` in your project root. This worked just fine; however, running the install script again would override your gulpfile and wipeout your customizations. In version 4, the gulpfile that ships with Viking Base now looks for a file called `viking-base.js` in your project root. The gulpfile expects `viking-base.js` to export a function that accepts 4 arguments. The 4th argument is a callback and must be called by your function. See below for a full example.

The Viking Base Node module provides a simple API for adding, removing or modifying gulp tasks. Every part of the gulp build is configurable. Here are the main configurable aspects of the build:

* gulp tasks
* Input sources
* Output paths
* Watch dependencies
* Clean task options

When `gulpfiles.js` requires the Viking Base module, the module exports a simple hash that can be manipulated any way you'd like. See `bower_components/viking-base/node_modules/viking-base/index.js` as a reference. This approach allows for Bower updates of Viking Base to bring in bug fixes and new features without writing over your build customizations.

In the following example, we'll add a simple image task. You will see how a new task can be added that also becomes a dependency of a built-in task. The following changes go in `viking-base.js`, as described above. Note the function being exported.

Example:

```javascript
// viking-base.js

module.exports = function( gulp, plugins, vb, cb ) {

  // Output updates
  vb.output.img = 'img/';

  // Source updates
  vb.sources.img = 'img/**/*';

  // Task updates
  vb.tasks.build.depends = [
    'handlebars',
    'img',
    'js-doc',
    'root'
  ];

  vb.tasks.handlebars.depends = ['img'];

  vb.tasks.img = {
    cb: function() {

      return gulp.src( this.sources.img )
        .pipe( gulp.dest( this.output.publish + this.output.img ) );
    }
  };

  // Calling the callback kicks off the build
  cb();
};
```

### Pre-Build

Version 6.1.0 included a new method that can be overridden called `preBuild`. This method is expected to return a stream and exists as a hook to process HTML before it passes into the `gulp-htmlbuild` plugin.

Example:

```javascript
// viking-base.js

module.exports = function( gulp, plugins, vb, cb ) {

  vb.preBuild = function() {

    // Replace language attribute of html tag
    return plugins.if( vb.prod, plugins.replace('lang="en"', 'lang="fr"') );
  };

  // Calling the callback kicks off the build
  cb();
};
```

## Command Line Options

Version 6 introduced the ability to extend the build from the command line in addition to extending via viking-base.js. For example, if you wanted the build output in a folder called dist, instead of the default publish, you could run a command like this:  
`gulp dev --output.publish dist/`

See `bower_components/viking-base/node_modules/viking-base/index.js` for a full API reference.

### Changes from Version 7.1.1

A new build property has been added called `useProdEmber` and the Ember reference in `index.html` has been changed to `ember.debug.js` from `ember.prod.js`. This allows your application to use the debug version of Ember with the `dev` build and the production version of Ember with the `prod` build. You'll need to change the reference to Ember in your `index.html` file if you want to use this. If you don't want to use this you can set `useProdEmber` to `false`.

### Changes from Version 6.0.0

The `handlebars` build target has been deprecated. The new template target is named `htmlbars`. If you have local `viking-base.js` overrides concerning the old `handlebars` build target you should consider updating them. I decided to allow this to break to force developers to evaluate their local changes and make sure they are necessary with HTMLBars.

The build now checks dependencies for mismatches. If it finds one it will prompt you to update them. It does this for both npm and Bower dependencies. If you'd like your build to automatically update dependencies then you can run the `udpate` task or set the option `checkDependsConfig.autoUpdate` to `true`.

### Changes from Version 5

There were a number of deprecated Node packages removed for version 6. The .gitignore file was also updated so build output, JSDoc output and dependencies are no longer tracked.

### Changes from Version 4

Viking Base used to include the Ember Start Kit Bower package since it included Ember, Handlebars and jQuery 1.x. One issue with this approach was that references in `index.html` to Ember had version numbers attached to them and the actual Bower packages for those libraries were not included. In version 5, Ember Starter Kit was removed in favor of more cleanly separated dependencies.

Another change introduced in version 5 was the REM Unit Polyfill dependency for IE 8 support. While version 4 saw the exclusion of some polyfills, it did not eliminate the conditionally loaded polyfills found in `index.html`. This is because these polyfills won't be loaded unless the user has IE 8, preventing bloated production output for all users. The REM Unit Polyfill helps ensure a decent experience with Foundation and IE 8.

### Changes from Version 3

Some JavaScript files have been removed from the scaffolding process. These files include:
```
js/main.js
js/plugins.js
js/pre-app.js
```

The reason these files have been removed from the project is because they made too many decisions for the devloper. Things like running Foundation on DOM ready, including some polyfills and turning off Ember debugging messages.

Another big change comes with the way that IE 8 grid styles were included. Previously, these styles would be included in `style.scss` but that automatically introduces some output file bloat for users of any browser if you want to support IE 8. The grid styles are still included but now they are conditionally loaded within `index.html` and a `css` build target was added for gulp to make sure they make it to the publish folder.

## References
* [Node.js](http://nodejs.org/)
* [npm](http://npmjs.org/)
* [gulp](http://gulpjs.com/)
* [Bower](http://bower.io/)
* [Ember.js](http://emberjs.com/)
* [Foundation](http://foundation.zurb.com/)
* [JSDoc](http://usejsdoc.org/)
