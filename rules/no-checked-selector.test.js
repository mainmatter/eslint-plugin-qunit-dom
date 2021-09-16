const { RuleTester } = require('eslint');

const rule = require('./no-checked-selector');

let ruleTester = new RuleTester({
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
});

ruleTester.run('no-checked-selector', rule, {
  valid: [
    'assert()',
    'assert.foo',
    "assert.foo('.foo:checked')",
    "notAssert.dom('.foo:checked')",
    "assert.dom('.foo:checked').somethingElse()",
    "assert.dom('.foo:checked').exists",
    "assert.dom(':checkedfoo').exists()",
    "assert.dom(':checked').exists()",
    "assert.dom('.foo:checked', '.bar').exists()",
    'assert.dom().exists()',
    'assert.dom(node).exists()',
    'assert.dom(42).exists()',
  ],
  invalid: [
    {
      code: "assert.dom('.foo:checked').exists()",
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
