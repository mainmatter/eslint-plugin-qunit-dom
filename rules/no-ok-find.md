# no-ok-find

💼 This rule is enabled in the ✅ `recommended` config.

🔧 This rule is automatically fixable by the [`--fix` CLI option](https://eslint.org/docs/latest/user-guide/command-line-interface#--fix).

<!-- end auto-generated rule header -->

`assert.ok/notOk(find('.foo'))` can be replaced with
`assert.dom('.foo').exists/doesNotExist()`.

## Examples

This rule **forbids** the following:

```js
assert.ok(find('.foo'))
```

```js
assert.notOk(find('.foo'))
```

This rule **allows** the following:

```js
assert.dom('.foo').exists()
```

```js
assert.dom('.foo').doesNotExist()
```
