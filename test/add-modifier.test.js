import postcss from 'postcss';
import test from 'ava';
import addModifier from '../src/index';

function runAddModifier(input, opts) {
  return postcss([
    addModifier(opts),
  ]).process(input);
}

test('Add modifier to single class', (t) => {
  const input = '.a-class {background: black;}';
  const modifier = 'modifier';
  return runAddModifier(input, {
      modifier
    }, {
      from: 'file.css'
    })
    .then((result) => {
      t.deepEqual(result.css.trim(), '.a-class--modifier {background: black;}');
    });
});

test('Add modifier to multiple classes in the same selector', (t) => {
  const input = '.class-1, .class-2 .class-3 ~ .class-4{color:green;}';
  const modifier = 'modifier';
  return runAddModifier(input, {
    modifier
  }, {
    from: 'file.css'
  }).then((result) => {
    t.deepEqual(result.css.trim(), '.class-1--modifier, .class-2--modifier .class-3--modifier ~ .class-4--modifier{color:green;}')
  });
});

test('Add modifier to matched classes', (t) => {
  const input = '.match-this-class .not-this-class {color:blue;}';
  const modifier = 'modifier';
  return runAddModifier(input, {
    modifier,
    match: /match-this-class/g
  }, {
    from: 'file.css'
  }).then((result) => {
    t.deepEqual(result.css.trim(), '.match-this-class--modifier .not-this-class {color:blue;}')
  });
});

test('Use a different delimiter', (t) => {
  const input = '.a-class {background: black;}';
  const modifier = 'modifier';
  const delimiter = '---';
  return runAddModifier(input, {
      modifier,
      delimiter
    }, {
      from: 'file.css'
    })
    .then((result) => {
      t.deepEqual(result.css.trim(), '.a-class---modifier {background: black;}');
    });
});

test('Forgot modifier', (t) => {
  const input = '.a-class {background: black;}';
  return runAddModifier(input, {},
    {
      from: 'file.css'
    })
    .then((result) => {
      t.deepEqual(result.css.trim(), '.a-class {background: black;}');
    });
});

test('Forgot options', (t) => {
  const input = '.a-class {background: black;}';
  return runAddModifier(input)
    .then((result) => {
      t.deepEqual(result.css.trim(), '.a-class {background: black;}');
    });
});
