'use strict';

var babelHelpers = require('./babelHelpers.js');

exports.__esModule = true;

var _tether = require('tether');

var _tether2 = babelHelpers.interopRequireDefault(_tether);

var _reactDom = require('react-dom');

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

		_reactDom.render(component, this.node, function () {
			return _this.tether.position();
		});

		this.component = component;
	};

	TetherElement.prototype.destroy = function destroy() {
		_reactDom.unmountComponentAtNode(this.node);
		this.node.parentNode.removeChild(this.node);
		this.tether.destroy();
	};

	return TetherElement;
})();

exports['default'] = TetherElement;
module.exports = exports['default'];