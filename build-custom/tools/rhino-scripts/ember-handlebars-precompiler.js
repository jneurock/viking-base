importPackage(java.io);

(function(args) {
    var output = ['// This file is auto-generated and should be ignored from version control.\n'],
        console = {
            log: print
        },
        showUsage = function() {
          console.log('Usage: java -jar <rhino.jar> ember-handlebars-compiler.js --handlebars <handlebars library path> --extension <handlebars file extension> --embercompiler <ember compiler path> --templates <templates directory> --output <output file>');
        },
        handlebarsLibrary,
        emberCompiler,
        templateFileExtension,
        templatesDirectory,
        outputFile,
        templateFiles,
        outStream,
        index,
        templateFile,
        templateContents,
        argumentsParser,
        options;

    argumentsParser = function() {
        var arg, parse = function(args) {
            var options = {};
            args = Array.prototype.slice.call(args);
            arg = args.shift();
            while (arg) {
                if (arg.indexOf("--") === 0) {
                    options[arg.substring(2)] = args.shift();
                }
                arg = args.shift();
            }
            return options;
        };

        return { parse: parse };
    };

    options = new argumentsParser().parse(args);
    handlebarsLibrary = options.handlebars;
    emberCompiler = options.embercompiler;
    templateFileExtension = options.extension || 'handlebars';
    templatesDirectory = options.templates;
    outputFile = options.output;

    templateFiles = new File(templatesDirectory).listFiles();
    outStream = new BufferedWriter(new FileWriter(outputFile));

    if (undefined === handlebarsLibrary || undefined === emberCompiler || undefined === templatesDirectory) {
        showUsage();
        java.lang.System.exit(1);
    }
    load(handlebarsLibrary);
    load(emberCompiler);

    output.push('(function(){');
    output.push('\n  var template = Ember.Handlebars.template, templates = Ember.TEMPLATES = Ember.TEMPLATES || {};\n');

    templateFiles = templateFiles.filter(function(fileName) {
        return(fileName.getName().substr(-(templateFileExtension.length + 1)) === ("." + templateFileExtension));
    });

    for (index = 0; index < templateFiles.length; index++) {
        templateFile = templateFiles[index];
        templateName = templateFile.getName().replaceAll(('\\.' + templateFileExtension + '$'), '').replace('.', '/');
        templateContents = Ember.Handlebars.precompile(readFile(templateFile.getAbsolutePath()));
        output.push('  templates[\'' + templateName + '\'] = template(' + templateContents + ');\n');
    }

    output.push('}());');

    outStream.write(output.join(''));
    outStream.close();
}(arguments));