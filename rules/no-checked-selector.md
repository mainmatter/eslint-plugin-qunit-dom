# no-ok-find

The `isChecked()` and `isNotChecked()` assertions should be preferred over
using the `:checked` CSS selector.

## Examples

This rule **forbids** the following:

```js
assert.dom('.foo:checked').exists()
```

This rule **allows** the following:

```js
assert.dom('.foo').isChecked()
```
