const message = "use assert.dom(...).exists() instead assert.ok(find(...))";

module.exports = {
  message,

  create(context) {
    return {
      MemberExpression(node) {
        if (node.object.type !== "Identifier") return;
        if (node.object.name !== "assert") return;
        if (node.property.type !== "Identifier") return;
        if (node.property.name !== "ok") return;

        if (!node.parent) return;
        if (node.parent.type !== "CallExpression") return;
        let firstArg = node.parent.arguments[0];
        if (!firstArg) return;
        if (firstArg.type !== "CallExpression") return;
        if (firstArg.callee.type !== "Identifier") return;
        if (firstArg.callee.name !== "find") return;

        context.report({
          node: node.parent,
          message,
        });
      },
    };
  },
};
