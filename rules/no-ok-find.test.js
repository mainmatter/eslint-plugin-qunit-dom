const { RuleTester } = require('eslint');

const rule = require('./no-ok-find');

let ruleTester = new RuleTester({
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
});

ruleTester.run('no-ok-find', rule, {
  valid: [
    "notAssert.ok(find('.foo'))",
    "assert.foo(find('.bar'))",
    'assert.ok',
    'assert.ok()',
    'assert.ok(1)',
    "assert.ok(notFind('.foo'))",
    "assert.ok(find('.foo', '.bar'))",
    'assert.ok(find())',

    "notAssert.notOk(find('.foo'))",
    'assert.notOk',
    'assert.notOk()',
    'assert.notOk(1)',
    "assert.notOk(notFind('.foo'))",
    "assert.notOk(find('.foo', '.bar'))",
    'assert.notOk(find())',
  ],
  invalid: [
    {
      code: "assert.ok(find('.foo'), 'bar')",
      output: "assert.dom('.foo').exists('bar')",
      errors: [
        {
          message: rule.message,
          column: 1,
          endColumn: 31,
        },
      ],
    },
    {
      code: "assert.ok(find('.foo'))",
      output: "assert.dom('.foo').exists()",
      errors: [
        {
          message: rule.message,
          column: 1,
          endColumn: 24,
        },
      ],
    },

    {
      code: "assert.notOk(find('.foo'), 'bar')",
      output: "assert.dom('.foo').doesNotExist('bar')",
      errors: [
        {
          message: rule.message,
          column: 1,
          endColumn: 34,
        },
      ],
    },
    {
      code: "assert.notOk(find('.foo'))",
      output: "assert.dom('.foo').doesNotExist()",
      errors: [
        {
          message: rule.message,
          column: 1,
          endColumn: 27,
        },
      ],
    },
  ],
});
