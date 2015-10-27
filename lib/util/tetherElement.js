'use strict';

var babelHelpers = require('./babelHelpers.js');

exports.__esModule = true;

var _tether = require('tether');

var _tether2 = babelHelpers.interopRequireDefault(_tether);

var _react = require('react');

var _react2 = babelHelpers.interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = babelHelpers.interopRequireDefault(_reactDom);

var TetherElement = (function () {
	function TetherElement(component, options) {
		babelHelpers.classCallCheck(this, TetherElement);

		this.component = component;
		this.node = document.createElement('div');
		this.node.style.position = 'absolute';
		document.body.appendChild(this.node);
		this.tether = new _tether2['default'](babelHelpers._extends({}, options, { element: this.node }));
		this.update(component);
	}

	TetherElement.prototype.update = function update() {
		var _this = this;

		var component = arguments.length <= 0 || arguments[0] === undefined ? this.component : arguments[0];

		_reactDom2['default'].render(component, this.node, function () {
			return _this.tether.position();
		});

		this.component = component;
	};

	TetherElement.prototype.destroy = function destroy() {
		_reactDom2['default'].unmountComponentAtNode(this.node);
		this.node.parentNode.removeChild(this.node);
		this.tether.destroy();
	};

	return TetherElement;
})();

exports['default'] = TetherElement;
module.exports = exports['default'];