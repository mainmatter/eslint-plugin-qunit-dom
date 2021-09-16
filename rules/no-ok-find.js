const OK_OR_NOTOK_SELECTOR =
  'CallExpression' +
  '[callee.type="MemberExpression"]' +
  '[callee.object.name="assert"]' +
  '[callee.property.name=/(ok|notOk)/]' +
  '[arguments.length>=1]';

const EQUAL_SELECTOR =
  'CallExpression' +
  '[callee.type="MemberExpression"]' +
  '[callee.object.name="assert"]' +
  '[callee.property.name="equal"]' +
  '[arguments.length>=2]' +
  '[arguments.1.type="Literal"]';

// see https://api.jquery.com/category/selectors/jquery-selector-extensions/
const JQUERY_SELECTOR_EXTENSIONS = [
  ':animated',
  ':button',
  ':checkbox',
  ':contains(',
  ':eq(',
  ':even',
  ':file',
  ':first',
  ':gt(',
  ':has(',
  ':header',
  ':hidden',
  ':image',
  ':input',
  ':last',
  ':lt(',
  ':odd',
  ':parent',
  ':password',
  ':radio',
  ':reset',
  ':selected',
  ':submit',
  ':text',
  ':visible',
];

module.exports = {
  meta: {
    type: 'suggestion',
    docs: {
      description: 'disallow use of `assert.ok(find(...))`',
      recommended: true,
      url: 'https://github.com/simplabs/eslint-plugin-qunit-dom/blob/main/rules/no-ok-find.md',
    },
    fixable: 'code',
    schema: [],
    messages: {
      ok: 'use assert.dom(...).exists() instead assert.ok(find(...))',
      'not-ok': 'use assert.dom(...).doesNotExists() instead assert.notOk(find(...))',
      'equal-true': 'use assert.dom(...).exists() instead assert.equal(find(...), true)',
      'equal-false': 'use assert.dom(...).doesNotExists() instead assert.equal(find(...), false)',
    },
  },

  create(context) {
    let sourceCode = context.getSourceCode();

    return {
      [OK_OR_NOTOK_SELECTOR](node) {
        let inverted = node.callee.property.name === 'notOk';

        let firstArg = node.arguments[0];
        if (!isFindCall(firstArg) && !isIndexedFindCall(firstArg)) return;

        let findNode = firstArg.type === 'MemberExpression' ? firstArg.object : firstArg;
        let firstFindArg = findNode.arguments[0];
        if (!isValidFindArg(firstFindArg)) return;

        context.report({
          node: node,
          messageId: inverted ? 'not-ok' : 'ok',

          fix(fixer) {
            let domArgs = sourceCode.getText(firstFindArg);
            let scopeArg = findNode.arguments[1];
            if (scopeArg && scopeArg.type === 'Literal' && typeof scopeArg.value === 'string') {
              domArgs += ', ';
              domArgs += sourceCode.getText(scopeArg);
            }

            let assertion = inverted ? 'doesNotExist' : 'exists';

            let messageArg = node.arguments[1];
            let messageArgText = messageArg ? sourceCode.getText(messageArg) : '';

            return fixer.replaceText(
              node,
              `assert.dom(${domArgs}).${assertion}(${messageArgText})`
            );
          },
        });
      },

      [EQUAL_SELECTOR](node) {
        let secondArg = node.arguments[1];
        if (typeof secondArg.value !== 'boolean') return;
        let inverted = !secondArg.value;

        let firstArg = node.arguments[0];
        if (!isFindCall(firstArg) && !isIndexedFindCall(firstArg)) return;

        let findNode = firstArg.type === 'MemberExpression' ? firstArg.object : firstArg;
        let findArgs = findNode.arguments;
        let firstFindArg = findArgs[0];
        if (!isValidFindArg(firstFindArg)) return;

        context.report({
          node: node,
          messageId: inverted ? 'equal-false' : 'equal-true',

          fix(fixer) {
            let domArgs = sourceCode.getText(firstFindArg);
            let scopeArg = findNode.arguments[1];
            if (scopeArg && scopeArg.type === 'Literal' && typeof scopeArg.value === 'string') {
              domArgs += ', ';
              domArgs += sourceCode.getText(scopeArg);
            }

            let assertion = inverted ? 'doesNotExist' : 'exists';

            let messageArg = node.arguments[2];
            let messageArgText = messageArg ? sourceCode.getText(messageArg) : '';

            return fixer.replaceText(
              node,
              `assert.dom(${domArgs}).${assertion}(${messageArgText})`
            );
          },
        });
      },
    };
  },
};

// checks for `find(...)`
function isFindCall(node) {
  return node.type === 'CallExpression' && node.callee.name === 'find';
}

// checks for `find(...)[0]`
function isIndexedFindCall(node) {
  return (
    node.type === 'MemberExpression' &&
    isFindCall(node.object) &&
    node.property.type === 'Literal' &&
    node.property.value === 0
  );
}

function isValidFindArg(node) {
  if (!node) return false;
  if (node.type === 'Literal') {
    return typeof node.value === 'string' && !hasJQuerySelector(node.value);
  }
  return true;
}

function hasJQuerySelector(selector) {
  return JQUERY_SELECTOR_EXTENSIONS.some(it => selector.includes(it));
}
