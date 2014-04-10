module.exports = function(grunt) {
  "use strict";

  var args  = require('yargs').argv,
      path  = require('path'),
      fs    = require('fs'),
      spawn = require('child_process').spawn;

  /**
   * Extension Creation Task
   * make_extension generates the folder structure for extensions.  It doesn't
   * currently do any more than that, but it could likely be extended to also
   * generate some sample files given that the name of the extension is known.
   */
  grunt.registerTask('make_extension', 'Generates the file structure for a new extension', function() {
    if(!args.name) { grunt.log.writeln("Must name extension.  E.G. gulp --name foo"); return false; }
    var baseDir = path.resolve(__dirname, 'source'),
        extName = args.name,
        extDir = path.resolve(baseDir, extName);

    function mkdir(path) {
      grunt.log.writeln('Generating folder: ' + path);
      fs.mkdirSync(path);
    }

    if(fs.existsSync(extDir)) { grunt.log.writeln("An extension by that name already exists."); return false; }

    mkdir(extDir);

    // Make client directories
    mkdir(path.resolve(extDir, 'client'));
    mkdir(path.resolve(extDir, 'client', 'en'));
    mkdir(path.resolve(extDir, 'client', 'models'));
    mkdir(path.resolve(extDir, 'client', 'views'));
    mkdir(path.resolve(extDir, 'client', 'widgets'));

    // Make DB directories
    mkdir(path.resolve(extDir, 'database'));
    mkdir(path.resolve(extDir, 'database', 'orm'));
    mkdir(path.resolve(extDir, 'database', 'orm', 'ext'));
    mkdir(path.resolve(extDir, 'database', 'orm', 'models'));
    mkdir(path.resolve(extDir, 'database', 'source'));

    // Make Test directory
    mkdir(path.resolve(extDir, 'test'));
  });

  /**
   * Extension Build Task
   * build is a simple wrapper around xtuple's build_app.js script designed to
   * run from this directory.  No real reason to have to cd between directories
   * when building extensions and this helps keep everything in one place.
   */
  grunt.registerTask('build', 'Calls xtuple\'s build_app command.', function() {
    if(!args.db) { grunt.log.writeln('You must supply a database.  E.g. `--db dev`'); return false; }
    if(!args.ext) { grunt.log.writeln('You must supply an extension.  E.g. `--ext icecream`'); return false; }

    var done = this.async(),
        dbArg     = ' -d ' + args.db,
        module    = args.ext,
        buildPath = path.resolve(__dirname, '..', 'xtuple', 'scripts', 'build_app.js'),
        extPath   = path.resolve(__dirname, 'source', module);

    grunt.log.writeln(buildPath + dbArg + ' -e ' + extPath);
    spawn(buildPath + dbArg + ' -e ' + extPath).stdout.pipe(process.stdout).on('end', done);
  });

  grunt.registerTask('default', ['build'])
};
