Extensions for the xTuple Mobile/Web platform
=================

[![Build Status](https://travis-ci.org/xtuple/xtuple-extensions.png)](https://travis-ci.org/xtuple/xtuple-extensions)

Thank you for your interest in building an extension for the xTuple web/mobile platform!

You'll want to follow our [Building an Extension Tutorial](https://github.com/xtuple/xtuple-extensions/blob/master/docs/TUTORIAL.md)
to get started.

Using Grunt
-----------

To get started using grunt, you first need to install grunt's CLI:

    sudo npm install -g grunt-cli

Then install all the dependencies.  Run the following command from the same directory as the package.json file (it should also contain this README):

    npm install

Currently, two tasks are defined: `make_extension` and `build`.

`make_extension`, as it's name suggests, assists in the extension creation process by generating the necessary file structure for an extension.  It requires one argument, `--name`, which is the name of the extension to create.

`build` is a light wrapper around xtuple's extension compilation process.  It allows you to easily run the build command against an extension.  It requires two arguments: `--db` and `--ext`, where `--db` is the name of the database used and `--ext` is the name of the extension.
Normally, to build an extension, you'd have to run a command like this: `../xtuple/scripts/build_app.js -d dev -e source/foo`.  This task allows you to simplify to just: `grunt build --db dev --ext foo`.
