var args = require('yargs').argv
  , babel = require('babel-core')
  , fs = require('fs')
  , outputFileSync = require('output-file-sync')
  , glob = require('glob')
  , path = require('path');

var helpers = []
  , babelrc = JSON.parse(
      fs.readFileSync(path.join(__dirname, '../.babelrc')));

args._.forEach(function (input) {
  var files = glob.sync(input + '/**/*.js*');
  if (!files.length) files = [input];

  files.forEach(function(file){
    var relative = file.replace(/\.(\w*?)$/, '') + '.js'
      , dest = path.join(args.outDir, path.relative(input, relative))
      , data = babel.transformFileSync(file, {
          externalHelpers: true,
          plugins: [
            'babel-plugin-external-helpers:after'
          ]
        });

    outputFileSync(dest, data.code);

    (data.metadata.usedHelpers || []).forEach(function(helper){
      if (helpers.indexOf(helper) === -1)
        helpers.push(helper)
    })

    console.log(file + ' -> ' + dest);
  });

});

if (helpers.length) {
  var outHelper = path.join(args.outDir, babelrc.extra.externalHelperPlugin.path)
  console.log('outputing helper file: ', outHelper)
  outputFileSync(
    outHelper, babel.buildExternalHelpers(helpers, 'umd'))
}
