The Viking Base is a set of front-end technologies that have been combined to create a solid platform with which to build web applications.

The package exists to accomplish a few main goals:

* Combine Ember, Handlebars, Foundation and HTML5 Boilerplate
* Generate production or development output with the H5BP Ant Build Script
* Manage platform dependencies with Bower

# System Requirements
The latest versions of the following are recommended.

* Java 1.6+
* Maven or Ant
* Node.js
* Bower (Not required if using Node package)

# Setting up a New Project with the Node Package
If you wish to setup your project with the Node package, please see this page [Viking Base Node Package](https://github.com/jneurock/viking-base-node-package). Setting up the project with the Node package allows you to skip copying the example files as described below.

# Setting up a New Project without the Node Package
It is encouraged to use the Node package for setting up a new project but if you don't want to you can install the project using Bower as follows:

```
# Create a directory for your project
mkdir my-project

# Change into your project directory
cd my-project

# Install the package with Bower
bower install viking-base

# Create some directories to kick off your project
mkdir css js js/app js/templates
```

When Bower has finished installing the package you will find some example files in the bower_components directory. Copy the example files and rename them in the following locations:

* ember-starter-kit/js/app.js to js/app/app.js
* viking_base/css/example-style.scss to css/style.scss
* viking_base/js/example-templates/example-application.hbs to js/templates/application.hbs
* viking_base/js/example-main.js to js/main.js
* viking_base/example-index.html to index.html
* viking_base/example-pom.xml to pom.xml
* viking_base/example-robots.txt to robots.txt
* viking_base/example.gitignore to .gitignore

After copying the example files you will be ready to build a Hello World application.

# Building Your Project
You can build your project with Maven or Ant. There are a number of build targets to choose from:

* No target - Will start a production build
* debug - Does not concatinate or minify JavaScript files for debugging
* debugdocs - Same as above but also generates JSDoc documentation
* docs - Generates JSDoc documentation only
* handlebars - Compiles Handlebars templates only and copies them to the publish directory

## Building with Maven
If you are using Maven to build your project you need to add build targets by using the "-P" flag. A build target is optional.

No target:
`mvn clean package`

Some target:
`mvn clean package -P <target-name>`

## Building with Ant
`ant -f bower_components/viking_base/build-custom <optional-target-name>`

It is important to note that the build command should be executed from the project root. If the build has completed successfuly, you should have a publish directory containing your project output.

# Why Would I Use This?
If I use Node and/or Compass and/or Grunt, etc., why would I use this? This platform is meant for developers that need to deploy their applications with build tools, e.g., Jenkins or who might work in a company that develops Java applications that want a more modern front-end stack than JSP can facilitate. This platform might not be suited for developers that already include Foundation or Ember in their projects through some other method.

# References
* [HTML5 Boilerplate](http://html5boilerplate.com/)
* [HTML5 Boilerplate Ant Build Script](https://github.com/h5bp/ant-build-script)
* [Ember.js](http://emberjs.com/)
* [Ember Starter Kit](https://github.com/emberjs/starter-kit)
* [Handlebars.js](http://handlebarsjs.com/)
* [Foundation](http://foundation.zurb.com/)
* [Maven](http://maven.apache.org/)
* [Ant](http://ant.apache.org/)