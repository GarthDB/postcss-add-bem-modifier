import parser from 'postcss-selector-parser';

/**
 *  Private: build the modifier to be added to a class name.
 *
 *  * `delimiter` {String} the separator to be added between the class and the modifier.
 *  * `modifier` {String} the string modifier to append to the class.
 *
 *  Returns {String} of new modifier.
 */
function _buildModifier(delimiter, modifier) {
  const result = (modifier != '') ? `${delimiter}${modifier}` : '';
  return result;
}

export default class AddModifier {
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
  constructor(css, opts) {
    this.delimiter = opts.delimiter || '--';
    this.modifier = _buildModifier(this.delimiter, opts.modifier || '');
    this.match = opts.match || /[\s\S]*/;
    css.walkRules(rule => {
      const transform = selectors => {
        selectors.walkClasses(classSelector => {
          if (classSelector.value.match(this.match)) {
            const newClass = classSelector.clone();
            newClass.value = `${classSelector.value}${this.modifier}`;
            return classSelector.replaceWith(newClass);
          }
        });
      };
      const processor = parser(transform);
      rule.selector = processor.processSync(rule.selector);
    });
  }
}
