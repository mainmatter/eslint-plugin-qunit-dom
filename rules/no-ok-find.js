const message = 'use assert.dom(...).exists() instead assert.ok(find(...))';

module.exports = {
  message,

  meta: {
    type: 'suggestion',
    docs: {
      description: 'disallow use of `assert.ok(find(...))`',
      recommended: true,
      url: 'https://github.com/simplabs/eslint-plugin-qunit-dom/blob/main/rules/no-ok-find.md',
    },
    fixable: 'code',
    schema: [],
  },

  create(context) {
    let sourceCode = context.getSourceCode();

    return {
      MemberExpression(node) {
        if (node.object.type !== 'Identifier') return;
        if (node.object.name !== 'assert') return;
        if (node.property.type !== 'Identifier') return;
        let inverted = false;

        if (node.property.name === 'notOk') {
          inverted = true;
        } else if (node.property.name !== 'ok') {
          return;
        }

        if (!node.parent) return;
        if (node.parent.type !== 'CallExpression') return;
        let firstArg = node.parent.arguments[0];
        if (!firstArg) return;
        if (firstArg.type !== 'CallExpression') return;
        if (firstArg.callee.type !== 'Identifier') return;
        if (firstArg.callee.name !== 'find') return;
        if (firstArg.arguments.length !== 1) return;

        context.report({
          node: node.parent,
          message,
          fix(fixer) {
            let findArgText = sourceCode.getText(firstArg.arguments[0]);
            let messageArg = node.parent.arguments[1];
            let messageArgText = messageArg ? sourceCode.getText(messageArg) : '';
            let assertion = inverted ? 'doesNotExist' : 'exists';

            return fixer.replaceText(
              node.parent,
              `assert.dom(${findArgText}).${assertion}(${messageArgText})`
            );
          },
        });
      },
    };
  },
};
