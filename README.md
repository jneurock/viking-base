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
* npm
* Bower

# Setting up a New Project

```
# Create a directory for your project
mkdir my-project

# Change into your project directory
cd my-project

# Install the package with Bower
bower install viking-base

# Run the install script
node bower_components/viking-base/example-install
```

After running the install script you will be ready to build. Out-of-the box your project will build a Hello Vikings demo application.

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
`ant -f bower_components/viking-base/build-custom <optional-target-name>`

## When the Build Is Done
It is important to note that the build command should be executed from the project root. If the build has completed successfuly, you should have a publish directory containing your project output.

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
* [Maven](http://maven.apache.org/)
* [Ant](http://ant.apache.org/)