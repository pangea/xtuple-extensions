var gulp = require('gulp'),
    args   = require('yargs').argv,
    fs = require('fs');

gulp.task('make:extension', function(callback) {
  if(!args.name) { throw "Must name extension.  E.G. gulp --name foo"; }
  var baseDir = process.cwd() + '/source',
      extName = args.name,
      extDir = baseDir + '/' + extName;

  if(fs.existsSync(extDir)) { throw "An extension by that name already exists."; }

  fs.mkdirSync(extDir);

  // Make client directories
  fs.mkdirSync(extDir + '/client');
  fs.mkdirSync(extDir + '/client/en');
  fs.mkdirSync(extDir + '/client/models');
  fs.mkdirSync(extDir + '/client/views');
  fs.mkdirSync(extDir + '/client/widgets');

  // Make DB directories
  fs.mkdirSync(extDir + '/database');
  fs.mkdirSync(extDir + '/database/orm');
  fs.mkdirSync(extDir + '/database/orm/ext');
  fs.mkdirSync(extDir + '/database/orm/models');
  fs.mkdirSync(extDir + '/database/source');

  // Make Test directory
  fs.mkdirSync(extDir + '/test');

  callback();
});

gulp.task('default', ['make:extension']);
