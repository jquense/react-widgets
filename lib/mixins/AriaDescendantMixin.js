'use strict';

exports.__esModule = true;

exports.default = function (nodeOrComponent) {
  var reconcileChildren = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : defaultReconcile;


  return {
    propTypes: {
      ariaActiveDescendantKey: _propTypes2.default.string.isRequired
    },

    contextTypes: {
      activeDescendants: shape
    },

    childContextTypes: {
      activeDescendants: shape
    },

    ariaActiveDescendant: function ariaActiveDescendant(id) {
      var key = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.props.ariaActiveDescendantKey;
      var activeDescendants = this.context.activeDescendants;

      var current = this.__ariaActiveDescendantId;

      if (id === undefined) return current;

      id = reconcileChildren.call(this, key, id);

      if (id === undefined) id = current;else {
        this.__ariaActiveDescendantId = id;
        flushAriaToNode(id, nodeOrComponent, this);
      }

      activeDescendants && activeDescendants.reconcile(key, id);
    },
    getChildContext: function getChildContext() {
      var _this = this;

      return this._context || (this._context = {
        activeDescendants: {
          reconcile: function reconcile(key, id) {
            return _this.ariaActiveDescendant(id, key);
          }
        }
      });
    }
  };
};

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _compat = require('../util/compat');

var _compat2 = _interopRequireDefault(_compat);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var shape = _propTypes2.default.shape({
  //setActive: PropTypes.func,
  reconcile: _propTypes2.default.func
});

function defaultReconcile(key, id) {
  return id;
}

function flushAriaToNode(id, nodeOrComponent, ctx) {
  var node = typeof nodeOrComponent === 'function' ? nodeOrComponent(ctx) : typeof nodeOrComponent === 'string' ? ctx.refs[nodeOrComponent] : ctx;

  if (node) {
    if (id) _compat2.default.findDOMNode(node).setAttribute('aria-activedescendant', id);else _compat2.default.findDOMNode(node).removeAttribute('aria-activedescendant');
  }
}

module.exports = exports['default'];