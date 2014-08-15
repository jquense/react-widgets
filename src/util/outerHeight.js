var $ = require('$')

module.exports = function outerHeight(elem, margin) {

  if (elem) {
    var size = elem.height()
      , sides = ['top', 'bottom'];

    sides.forEach(function(side) {
      size += parseInt(elem.css("border-" + side + "-width"), 10)
      size += parseInt(elem.css("padding-" + side ), 10)

      if (margin) size += parseInt(elem.css('margin-' + side), 10);
    });

    return size;
  } 

  return null;
}