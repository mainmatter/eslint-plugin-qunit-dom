# no-ok-find

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
