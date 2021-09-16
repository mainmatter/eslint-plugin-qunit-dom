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
    "notAssert.ok(find('.foo'));",
    "assert.foo(find('.bar'));",
    'assert.ok;',
    'assert.ok();',
    'assert.ok(1);',
    "assert.ok(notFind('.foo'));",
    'assert.ok(find());',

    "notAssert.notOk(find('.foo'));",
    'assert.notOk;',
    'assert.notOk();',
    'assert.notOk(1);',
    "assert.notOk(notFind('.foo'));",
    'assert.notOk(find());',

    // from https://github.com/simplabs/qunit-dom-codemod/blob/master/__testfixtures__/qunit-dom-codemod/ok-find.input.js
    "assert.ok(find('input:first'));",
    "assert.ok(find('input:contains(foo)'));",
    "assert.equal(find('.foo'));",
    "assert.strictEqual(find('.foo'));",
    'assert.ok(true);',
    'assert.equal(foo(), true);',
    'assert.strictEqual(foo(), true);',

    // from https://github.com/simplabs/qunit-dom-codemod/blob/master/__testfixtures__/qunit-dom-codemod/ok-find.input.js
    "assert.notOk(find('input:first'));",
    "assert.notOk(find('input:contains(foo)'));",
    'assert.notOk(true);',

    "assert.equal(find('.foo'), 'foo');",
    'assert.equal(find(), true);',
    'assert.equal(find(42), true);',

    "assert.strictEqual(find('.foo'), true);",
    "assert.strictEqual(find('.foo')[0], true);",
    "assert.strictEqual(find('.foo'), true, 'custom message');",
    "assert.strictEqual(find('.foo')[0], true, 'custom message');",
    "assert.strictEqual(find('.foo', '.parent-scope'), true);",
    "assert.strictEqual(find('.foo', '.parent-scope')[0], true);",

    "assert.strictEqual(find('.foo'), false);",
    "assert.strictEqual(find('.foo')[0], false);",
    "assert.strictEqual(find('.foo'), false, 'custom message');",
    "assert.strictEqual(find('.foo')[0], false, 'custom message');",
    "assert.strictEqual(find('.foo', '.parent-scope'), false);",
    "assert.strictEqual(find('.foo', '.parent-scope')[0], false);",
  ],

  invalid: [
    // from https://github.com/simplabs/qunit-dom-codemod/blob/master/__testfixtures__/qunit-dom-codemod/ok-find.input.js

    {
      code: "assert.ok(find('.foo'));",
      output: "assert.dom('.foo').exists();",
      errors: [{ messageId: 'ok' }],
    },
    {
      code: "assert.ok(find('.foo')[0]);",
      output: "assert.dom('.foo').exists();",
      errors: [{ messageId: 'ok' }],
    },
    {
      code: 'assert.ok(find(foo));',
      output: 'assert.dom(foo).exists();',
      errors: [{ messageId: 'ok' }],
    },
    {
      code: 'assert.ok(find(foo.bar));',
      output: 'assert.dom(foo.bar).exists();',
      errors: [{ messageId: 'ok' }],
    },

    {
      code: "assert.ok(find('.foo'), 'custom message');",
      output: "assert.dom('.foo').exists('custom message');",
      errors: [{ messageId: 'ok' }],
    },
    {
      code: "assert.ok(find('.foo')[0], 'custom message');",
      output: "assert.dom('.foo').exists('custom message');",
      errors: [{ messageId: 'ok' }],
    },

    {
      code: "assert.ok(find('.foo', '.parent-scope'));",
      output: "assert.dom('.foo', '.parent-scope').exists();",
      errors: [{ messageId: 'ok' }],
    },
    {
      code: "assert.ok(find('.foo', '.parent-scope')[0]);",
      output: "assert.dom('.foo', '.parent-scope').exists();",
      errors: [{ messageId: 'ok' }],
    },

    {
      code: "assert.equal(find('.foo'), true);",
      output: "assert.dom('.foo').exists();",
      errors: [{ messageId: 'equal-true' }],
    },
    {
      code: "assert.equal(find('.foo')[0], true);",
      output: "assert.dom('.foo').exists();",
      errors: [{ messageId: 'equal-true' }],
    },

    {
      code: "assert.equal(find('.foo'), true, 'custom message');",
      output: "assert.dom('.foo').exists('custom message');",
      errors: [{ messageId: 'equal-true' }],
    },
    {
      code: "assert.equal(find('.foo')[0], true, 'custom message');",
      output: "assert.dom('.foo').exists('custom message');",
      errors: [{ messageId: 'equal-true' }],
    },

    {
      code: "assert.equal(find('.foo', '.parent-scope'), true);",
      output: "assert.dom('.foo', '.parent-scope').exists();",
      errors: [{ messageId: 'equal-true' }],
    },
    {
      code: "assert.equal(find('.foo', '.parent-scope')[0], true);",
      output: "assert.dom('.foo', '.parent-scope').exists();",
      errors: [{ messageId: 'equal-true' }],
    },

    // from https://github.com/simplabs/qunit-dom-codemod/blob/master/__testfixtures__/qunit-dom-codemod/not-ok-find.input.js

    {
      code: "assert.notOk(find('.foo'));",
      output: "assert.dom('.foo').doesNotExist();",
      errors: [{ messageId: 'not-ok' }],
    },
    {
      code: "assert.notOk(find('.foo')[0]);",
      output: "assert.dom('.foo').doesNotExist();",
      errors: [{ messageId: 'not-ok' }],
    },
    {
      code: 'assert.notOk(find(foo));',
      output: 'assert.dom(foo).doesNotExist();',
      errors: [{ messageId: 'not-ok' }],
    },
    {
      code: 'assert.notOk(find(foo.bar));',
      output: 'assert.dom(foo.bar).doesNotExist();',
      errors: [{ messageId: 'not-ok' }],
    },

    {
      code: "assert.notOk(find('.foo'), 'custom message');",
      output: "assert.dom('.foo').doesNotExist('custom message');",
      errors: [{ messageId: 'not-ok' }],
    },
    {
      code: "assert.notOk(find('.foo')[0], 'custom message');",
      output: "assert.dom('.foo').doesNotExist('custom message');",
      errors: [{ messageId: 'not-ok' }],
    },

    {
      code: "assert.notOk(find('.foo', '.parent-scope'));",
      output: "assert.dom('.foo', '.parent-scope').doesNotExist();",
      errors: [{ messageId: 'not-ok' }],
    },
    {
      code: "assert.notOk(find('.foo', '.parent-scope')[0]);",
      output: "assert.dom('.foo', '.parent-scope').doesNotExist();",
      errors: [{ messageId: 'not-ok' }],
    },

    {
      code: "assert.equal(find('.foo'), false);",
      output: "assert.dom('.foo').doesNotExist();",
      errors: [{ messageId: 'equal-false' }],
    },
    {
      code: "assert.equal(find('.foo')[0], false);",
      output: "assert.dom('.foo').doesNotExist();",
      errors: [{ messageId: 'equal-false' }],
    },

    {
      code: "assert.equal(find('.foo'), false, 'custom message');",
      output: "assert.dom('.foo').doesNotExist('custom message');",
      errors: [{ messageId: 'equal-false' }],
    },
    {
      code: "assert.equal(find('.foo')[0], false, 'custom message');",
      output: "assert.dom('.foo').doesNotExist('custom message');",
      errors: [{ messageId: 'equal-false' }],
    },

    {
      code: "assert.equal(find('.foo', '.parent-scope'), false);",
      output: "assert.dom('.foo', '.parent-scope').doesNotExist();",
      errors: [{ messageId: 'equal-false' }],
    },
    {
      code: "assert.equal(find('.foo', '.parent-scope')[0], false);",
      output: "assert.dom('.foo', '.parent-scope').doesNotExist();",
      errors: [{ messageId: 'equal-false' }],
    },
  ],
});
