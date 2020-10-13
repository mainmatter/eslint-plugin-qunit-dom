const { RuleTester } = require("eslint");

const rule = require("./no-ok-find");

let ruleTester = new RuleTester({
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: "module",
  },
});

ruleTester.run("no-ok-find", rule, {
  valid: [
    "notAssert.ok(find('.foo'))",
    "assert.foo(find('.bar'))",
    "assert.ok",
    "assert.ok()",
    "assert.ok(1)",
  ],
  invalid: [
    {
      code: "assert.ok(find('.foo'), 'bar')",
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
      errors: [
        {
          message: rule.message,
          column: 1,
          endColumn: 24,
        },
      ],
    },
  ],
});
