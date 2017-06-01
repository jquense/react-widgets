'use strict';
// https://github.com/ekryski/less2sass
let glob = require('glob')
let path = require('path')
let fs = require('fs')
let mkdir = require('mkdirp')

const processors = [
  // interpolated variables
  { pattern: /@\{(?!(\s|\())/g, replace: '#{$' },
  // literal strings
  { pattern: /~("|')/g, replace: '$1' },
  // replace variable prefix
  { pattern: /@(?!(media|import|mixin|font-face|keyframes)(\s|\())/g, replace: '$$' },
  // add !default to SCSS variables
  { pattern: /^(\$[\w\d-_]+:\s*(.(?!\!default))+);(.*)$/gm, replace: '$1 !default;$3' },
  // convert Mixins
  { pattern: /^(\s*?)\.([\w\-]*?)\s*\((.*)\)+\s*\{$/gm, replace: '$1@mixin $2($3) {' },
  // convert :extend
  {
    pattern: /^(\s*?)&:extend\((.*)\);?$/,
    replace: (_, g1, g2) => `${g1}@extend ${g2.replace(/\s+all$/, '')};`
  },
  // include mixins, must not leave off the parens at invocation
  { pattern: /^(\s*)\.([a-zA-Z][\w\-]*\([^;]*\);?$)/gm, replace: '$1@include $2' },
  // change file extensions
  { pattern: /\.less/g, replace: '.scss' }
]

function processLine(line) {
  return processors.reduce(
    (line, { pattern, replace }) => line.replace(pattern, replace), line
  );
}

function transpile(filename) {
  let lines = fs.readFileSync(filename, 'utf8').split(/\r?\n/);

  let code = lines.map(processLine).join('\n')

  let outName = path.basename(filename, '.less') + '.scss'
  let outPath = __dirname + '/lib/scss'
  let outFile = outPath + '/' + outName;

  console.log('Writing scss file: ' + outName) // eslint-disable-line

  mkdir.sync(outPath)
  fs.writeFileSync(outFile, code)
}

let files = glob.sync(__dirname + '/src/less/*.less');

files.forEach(transpile)
