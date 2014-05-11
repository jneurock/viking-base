Viking Base is an opinionated package intended to provide a solid starting point for building web applications. The package consists of several key components: Ember, Handlebars, Foundation and Gulp. Viking Base leans on Bower to manage dependencies and Gulp to build while providing a simple scaffolding script.

Currently, the package consists of:

* Ember 1.5.1
* Handlebars 1.1.2
* Foundation 5.2.2
* Modernizr 2.8.1
* Respond 1.4.2

## Getting Started

Install the package via Bower:
`bower install viking-base`

Run the scaffolding script:
`node bower_components/viking-base/install`

Install the Gulp build dependencies:
`npm install`

Try out the dev build:
`gulp dev`

## Gulp Build Targets

Viking Base includes three Gulp build targets: dev, prod and default (which does not need to be specified). The goals of the Gulp build are:

* Compile Sass
* Compile Handlebars templates
* Generate JSDoc documentation
* Output to a publish folder
* For production:
    * Minify CSS
    * Concatenate and minify JavaScript
    * Hash CSS and JavaScript ouput file names

**default**
The `default` build runs a `dev` build first and then watches Sass and Handlebars resources for changes. There is no need to tell Gulp which build to run in this case. Simply run Gulp:
`gulp`

**dev**
The `dev` build is similar to the `prod` build except that it doesn’t minify or concatenate any resources. To run the `dev` build:
`gulp dev`

**prod**
The `prod` build does the same thing as the `dev` build but also concatenates and minifies CSS and JavaScript resources. The `prod` build also hashes the output file names.

## Updating Viking Base

Updates to Viking Base may consist of simple dependency updates or Gulp file updates. To update Viking base run:
`bower update`

After the Bower update, you can run the scaffolding script again in case Gulp file updates are available. Note: If you’ve customized your Gulp file or package.json file, you should make backups before running the scaffolding script again so you can merge your changes with the new Gulp file manually.
`node bower_components/viking-base/install`

If there were any Gulp dependency updates, it might be good to update them, too:
`npm update`

## References
* [node.js](http://nodejs.org/)
* [npm](http://npmjs.org/)
* [gulp.js](http://gulpjs.com/)
* [Bower](http://bower.io/)
* [Ember.js](http://emberjs.com/)
* [Ember Starter Kit](https://github.com/emberjs/starter-kit)
* [Handlebars.js](http://handlebarsjs.com/)
* [Foundation](http://foundation.zurb.com/)
* [JSDoc](http://usejsdoc.org/)