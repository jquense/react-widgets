
module.exports = function replace(str, data, path) {
  path = path ? path + '.' : '';

  for (var p in data) {
    if (typeof data[p] ==='object')
      str = replace(str, data[p], p)
    else
      str = str.replace(new RegExp('\\${' + path + p + '}', 'g'), data[p]);
  }
  return str;
}
