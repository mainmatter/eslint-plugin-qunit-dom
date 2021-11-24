eslint-plugin-qunit-dom
==============================================================================

An ESLint plugin for [qunit-dom] that automatically fixes the most common issues.

[qunit-dom]: https://github.com/simplabs/qunit-dom


Compatibility
------------------------------------------------------------------------------

- [ESLint](https://eslint.org/) 7.0.0 or above
- [Node.js](https://nodejs.org/) 12.x or above


Installation
------------------------------------------------------------------------------

```shell
yarn add --dev eslint-plugin-qunit-dom
```

Or

```shell
npm install --save-dev eslint-plugin-qunit-dom
```


Usage
------------------------------------------------------------------------------

Modify your `.eslintrc.js` by adding the `plugin:qunit-dom/recommended` config
to the `extends` list:

```js
// .eslintrc.js
module.exports = {
  extends: [
    // ...
    'plugin:qunit-dom/recommended' 
  ],
};
```

Rules
------------------------------------------------------------------------------

Each rule has emojis denoting:

- ✅ if the rule is part of the `recommended` config
- 🔧 if some problems reported by the rule are automatically fixable by the `--fix` [command line](https://eslint.org/docs/user-guide/command-line-interface#fixing-problems) option
- 💡 if some problems reported by the rule are manually fixable by editor [suggestions](https://eslint.org/docs/developer-guide/working-with-rules#providing-suggestions)

<!--RULES_TABLE_START-->

| Name    | Description | ✅ | 🔧 | 💡 |
|:--------|:------------|:---------------|:-----------|:---------------|
| [no-checked-selector](./rules/no-checked-selector.md) | disallow use of `assert.dom('.foo:checked').exists()` | ✅ | 🔧 |  |
| [no-ok-find](./rules/no-ok-find.md) | disallow use of `assert.ok(find(...))` | ✅ | 🔧 |  |

<!--RULES_TABLE_END-->


License
------------------------------------------------------------------------------

This project is developed by and &copy; [simplabs GmbH](http://simplabs.com)
and contributors. It is released under the [MIT License](./LICENSE).
