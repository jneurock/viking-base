The Viking Base is a set of front-end technologies that have been combined to create a solid platform with which to build web applications.

The package exists to accomplish a few main goals:

* Combine Ember, Handlebars, Foundation and HTML5 Boilerplate
* Generate production or development output with the H5BP Ant Build Script
* Manage platform dependencies with Bower

Currently, the package consists of:

* Ember 1.5
* Handlebars 1.1.2
* Foundation 5.2.1
* HTML5 Boilerplate Ant Build Script
* HTML5 Boilerplate 4.3
* Modernizr 2.7.1
* Respond 1.4.1

# Quick Start Guide

```
# Create a directory for your project
mkdir <my-project> && cd <my-project>

# Install the package with Bower
bower install viking-base

# Run the install script
node bower_components/viking-base/example-install

# Build the debug version of the Hello Vikings app with Maven or Ant
mvn clean package -D target=debug
or
ant -f bower_components/viking-base/build-custom debug
```

# System Requirements
The project is known to work with the following:

* Java 1.6+
* Maven 3.0+ or Ant 1.8.2+
* Node.js 0.10.7+
* Bower 1.2.8+

# Setting up a New Project

```
# Create a directory for your project
mkdir <my-project>

# Change into your project directory
cd <my-project>

# Install the package with Bower
bower install viking-base

# Run the install script
node bower_components/viking-base/example-install
```

After running the install script you will be ready to build. Out-of-the box your project will build a Hello Vikings demo application.

# Building Your Project
You can build your project with Maven or Ant. The build command should be executed from the project root. There are a number of build targets to choose from:

* No target - Will start a production build
* debug - Does not concatinate or minify JavaScript files. Concatenates but does not minify CSS files.
* debugcss - Concatenates but does not minify CSS files.
* debugdocs - Same as "debug" target but also generates JSDoc documentation.
* debughbs - If you just need to publish updates to your Handlebars templates.
* debugjs - If you just need to publish updates to your JavaScript files.
* docs - Generates JSDoc documentation only.

When the build is finished, you should have a publish directory containing your project output (unless only building documentation). Documentation will be output to the "docs" directory in the project root.

## Building with Maven
If you are using Maven to build your project you need to add build targets by using the "-P" flag. A build target is optional.

No target:
`mvn clean package`

Some target:
`mvn clean package -D target=<target-name>`

## Building with Ant
`ant -f bower_components/viking-base/build-custom <optional-target-name>`

## Skipping the Jar Target
By default, the build will Jar the contents of your project. If you don't want this behavior you can set the "jarPhase" property to "never" from the command line:
`mvn clean package -D jarPhase=never`
or
`ant -f bower_components/viking-base/build-custom -DjarPhase=never`

Note that Ant requires no space between the -D flag and the following property where as Maven does allow for a space.

If you really don't want to ever Jar the contents of your project, you can edit the POM and set &lt;jarPhase&gt;never&lt;/jarPhase&gt; instead of the default which is "package".

## Customizing the build
It's possible to customize your build by adding your own build.xml file. In your build file you would include the base build file found at bower_components/viking-base/build-custom/build.xml. You can add new targets, override existing targets, add new properties or override existing properties. You can then tell Ant to use your build file or modify the POM so Maven will use it.

## Versioning Your Project
Aside from using Git tags to keep track of your project version, you can also keep track of the version in the POM. Even if you build your project with Ant, the build will look to the POM for the version number.

# Why Would I Use This?
If I use Node and/or Compass and/or Grunt, etc., why would I use this? This platform is meant for developers that need to deploy their applications with build tools, e.g., Jenkins or who might work in a company that develops Java applications that want a more modern front-end stack than JSP can facilitate. This platform might not be suited for developers that already include Foundation or Ember in their projects through some other method.

# References
* [HTML5 Boilerplate](http://html5boilerplate.com/)
* [HTML5 Boilerplate Ant Build Script](https://github.com/h5bp/ant-build-script)
* [Ember.js](http://emberjs.com/)
* [Ember Starter Kit](https://github.com/emberjs/starter-kit)
* [Handlebars.js](http://handlebarsjs.com/)
* [Foundation](http://foundation.zurb.com/)
* [Node.js](http://nodejs.org/)
* [Bower](http://bower.io/)
* [Maven](http://maven.apache.org/)
* [Ant](http://ant.apache.org/)
* [JSDoc](http://usejsdoc.org/)