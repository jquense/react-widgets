const glob = require('glob');
const path = require('path');
const camelCase = require('lodash/camelCase');
const upperFirst = require('lodash/upperFirst');

const ICONS_DIR = 'libraries/icons';

const getIconName = iconPath => {
  return upperFirst(camelCase(path.basename(iconPath, '.js')));
};

const icons = glob
  .sync(path.resolve(__dirname, '..', ICONS_DIR, '*.js'))
  .map(iconPath => ({
    path: iconPath,
    name: getIconName(iconPath),
  }));

module.exports = icons;
