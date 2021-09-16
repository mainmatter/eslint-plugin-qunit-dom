module.exports = {
  meta: {
    type: 'suggestion',
    docs: {
      description: "disallow use of `assert.dom('.foo:checked').exists()`",
      recommended: true,
      url: 'https://github.com/simplabs/eslint-plugin-qunit-dom/blob/main/rules/no-checked-selector.md',
    },
    schema: [],
    messages: {
      default: "use assert.dom('.foo').isChecked() instead of assert.dom('.foo:checked').exists()",
    },
  },

  create(context) {
    return {
      CallExpression(node) {
        if (node.callee.type !== 'MemberExpression') return;

        if (node.callee.object.type !== 'Identifier') return;
        if (node.callee.object.name !== 'assert') return;
        if (node.callee.property.type !== 'Identifier') return;
        if (node.callee.property.name !== 'dom') return;

        if (!node.parent) return;
        if (node.parent.type !== 'MemberExpression') return;

        if (node.parent.property.type !== 'Identifier') return;
        if (node.parent.property.name !== 'exists') return;

        if (!node.parent.parent) return;
        if (node.parent.parent.type !== 'CallExpression') return;

        if (node.arguments.length !== 1) return;
        let firstArg = node.arguments[0];
        if (!firstArg) return;
        if (firstArg.type !== 'Literal') return;
        if (typeof firstArg.value !== 'string') return;

        if (firstArg.value === ':checked') return;
        if (!firstArg.value.endsWith(':checked')) return;

        context.report({
          node: node,
          messageId: 'default',
        });
      },
    };
  },
};
