'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CLASS_REGEX = /\.([^\s,{[~+>]*)/g;

/**
 *  Private: build the modifier to be added to a class name.
 *
 *  * `delimiter` {String} the separator to be added between the class and the modifier.
 *  * `modifier` {String} the string modifier to append to the class.
 *
 *  Returns {String} of new modifier.
 */
function _buildModifier(delimiter, modifier) {
  var result = modifier != '' ? '' + delimiter + modifier : '';
  return result;
}

var AddModifier =
/**
 *  Public: constructor for addModifier
 *
 *  * `css` {Root} PostCSS Root Node.
 *  * `opts` (optional) {Object}
 *    * `delimiter` {String} the separator to be added between the class and the modifier.
 *    * `modifier` {String} the string modifier to append to the class.
 *    * `match` {RegEx} a regular express to match class names to add the modifier. If ommited all classes will be modified.
 *
 *  Returns {Root} transformed PostCSS Root Node.
 */
function AddModifier(css) {
  var _this = this;

  var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  (0, _classCallCheck3.default)(this, AddModifier);

  this.delimiter = opts.delimiter || '--';
  this.modifier = _buildModifier(this.delimiter, opts.modifier || '');
  this.match = opts.match || true;
  css.walkRules(function (rule) {
    var matching;
    while (matching = CLASS_REGEX.exec(rule.selector)) {
      if (matching[1].match(_this.match)) {
        console.log('matches');
      }
      console.log(matching);
    }

    rule.selector = rule.selector.replace(CLASS_REGEX, '.$1' + _this.modifier);
  });
};

exports.default = AddModifier;
module.exports = exports['default'];