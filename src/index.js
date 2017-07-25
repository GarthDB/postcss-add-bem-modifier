import postcss from 'postcss';
import AddModifier from './add-modifier';

export default postcss.plugin('postcss-add-bem-modifier',
  (opts = {}) =>
    (css) =>
      new AddModifier(css, opts)
);
