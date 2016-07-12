'use strict';
// https://github.com/ekryski/less2sass
let glob = require('glob')
let path = require('path')
let fs = require('fs')
let mkdir = require('mkdirp')

let files = glob.sync(__dirname + '/../src/less/*.less');

files.forEach(transpile)

function transpile(filename) {
  let lines = fs.readFileSync(filename, 'utf8').split(/\r?\n/);

  let code = lines.map(line => {

    line = convertInterpolatedVariables(line);
    line = convertTildaStrings(line);
    line = convertVariables(line);
    line = convertMixins(line);
    line = convertExtend(line);
    line = includeMixins(line);
    line = convertFileExtensions(line);
    return line;
  })
  .join('\n')

  let outName = path.basename(filename, '.less') + '.scss'
  let outPath = __dirname + '/../lib/scss'
  let outFile = outPath + '/' + outName;

  console.log('Writing scss file: ' + outName) // eslint-disable-line

  mkdir.sync(outPath)
  fs.writeFileSync(outFile, code)
}

function includeMixins(line) {
  var includeRegex = /^(\s*)\.([a-zA-Z][\w\-]*\([^;]*\);?$)/gm;

  return line.replace(includeRegex, '$1@include $2');
}

function convertMixins(line) {
  var mixinRegex = /^(\s*?)\.([\w\-]*?)\s*\((.*)\)+\s*\{$/gm;

  return line.replace(mixinRegex, '$1@mixin $2($3) {');
}

function convertExtend(line) {
  var extendRegex = /^(\s*?)&:extend\((.*)\s.*\);?$/;

  return line.replace(extendRegex, '$1@extend $2;');
}

function convertTildaStrings(line) {
  var tildaRegex = /~("|')/g;

  return line.replace(tildaRegex, '$1');
}

function convertInterpolatedVariables(line) {
  var interpolationRegex = /@\{(?!(\s|\())/g;

  return line.replace(interpolationRegex, '#{$');
}

function convertVariables(line) {
  // Matches any @ that doesn't have 'media ' or 'import ' after it.
  var atRegex = /@(?!(media|import|mixin|font-face|keyframes)(\s|\())/g;

  // Matches any Sass variable line
  var variableRegex = /^(\$[\w\d-_]+:\s*(.(?!\!default))+);(.*)$/gm;

  return line.replace(atRegex, '$$').replace(variableRegex, '$1 !default;$3');
}

function convertFileExtensions(line) {
  var extensionRegex = /\.less/g;

  return line.replace(extensionRegex, '.scss');
}
