Viking Base is an opinionated package intended to provide a solid starting point for building web applications. The package consists of several key components: Ember.js, Handlebars.js, Foundation and gulp. Viking Base leans on Bower to manage dependencies and gulp to build while providing a simple scaffolding script.

Currently, the package consists of:

* Ember.js 1.5.1
* Handlebars.js 1.1.2
* Foundation 5.2.2
* Modernizr 2.8.1
* Respond 1.4.2

## Getting Started

Install the package via Bower:  
`bower install viking-base`

Run the scaffolding script:  
`node bower_components/viking-base/install`

Install the gulp build dependencies:  
`npm install`

Try out the dev build:  
`gulp dev`

## gulp Targets

Viking Base includes three gulp build targets: dev, prod and default (which does not need to be specified). The goals of the gulp build are:

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

## Extending Viking Base
The Viking Base node module provides a simple API for adding, removing or modifying gulp tasks. Every part of the gulp build is configurable. Here are the main configurable aspects of the build:

* gulp tasks
* Input sources
* Output paths
* Watch dependencies
* Clean task options

When gulpfiles.js requires the node module, the module exportss a simple hash that can be manipulated any way you'd like. See `bower_components/viking-base/node_modules/viking-base/index.js` as a reference. This approach allows for Bower updates of Viking Base to bring in bug fixes and new features without writing over your build customizations.

To customize the build, edit `gulpfile.js`. In the following example, we'll add a simple image task. You will see how a new task can be added that also becomes a dependency of a built-in task. 

Example:

```javascript
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

// Modify tasks as you need before calling vb.registerGulpTasks
vb.registerGulpTasks();
```

## Updating Viking Base

Updates to Viking Base may consist of simple dependency updates or gulp file updates. To update Viking base run:  
`bower update`

**Note:** Though unlikely, it is possible that Viking Base might have node module dependency updates. You can compare `bower_components/viking-base/package.json` with your project's `package.json` if you update Viking Base to a new major or minor version. Patch version updates should not contain node module dependency updates.

## References
* [node.js](http://nodejs.org/)
* [npm](http://npmjs.org/)
* [gulp](http://gulpjs.com/)
* [Bower](http://bower.io/)
* [Ember.js](http://emberjs.com/)
* [Ember Starter Kit](https://github.com/emberjs/starter-kit)
* [Handlebars.js](http://handlebarsjs.com/)
* [Foundation](http://foundation.zurb.com/)
* [JSDoc](http://usejsdoc.org/)