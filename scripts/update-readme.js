/**
 * This is a modified file that originally was created by:
 * @author Toru Nagashima
 * @copyright 2017 Toru Nagashima. All rights reserved.
 * See LICENSE file in root directory for full license.
 */

'use strict';

const fs = require('fs');
const path = require('path');

const RECOMMENDED = '✅';
const FIXABLE = '🔧';
const SUGGESTIONS = '💡';

if (require.main === module) {
  writeReadmeFile();
} else {
  module.exports = { generateReadme };
}

function generateReadme(readmeFile) {
  let tablePlaceholder = /<!--RULES_TABLE_START-->[\S\s]*<!--RULES_TABLE_END-->/;
  let readmeContent = fs.readFileSync(readmeFile, 'utf8');

  let rules = Object.entries(require('../index').rules);

  let categories = rules
    .map(entry => entry[1].meta.docs.category)
    .reduce((arr, category) => {
      if (!arr.includes(category)) {
        arr.push(category);
      }
      return arr;
    }, [])
    .sort(function (a, b) {
      return a.toLowerCase().localeCompare(b.toLowerCase()); // Case-insensitive sort function.
    });

  let rulesTableContent = categories
    .map(
      category =>
        (category ? `### ${category}\n\n` : '') +
        `| Name    | Description | ${RECOMMENDED} | ${FIXABLE} | ${SUGGESTIONS} |
|:--------|:------------|:---------------|:-----------|:---------------|
${rules
  .filter(([, rule]) => rule.meta.docs.category === category && !rule.meta.deprecated)
  .map(entry => {
    let name = entry[0];
    let meta = entry[1].meta;
    let link = `[${name}](./rules/${name}.md)`;
    let description = meta.docs.description || '(no description)';
    return `| ${link} | ${description} | ${meta.docs.recommended ? RECOMMENDED : ''} | ${
      meta.fixable ? FIXABLE : ''
    } | ${meta.hasSuggestions ? SUGGESTIONS : ''} |`;
  })
  .join('\n')}
`
    )
    .join('\n');

  let deprecatedRules = rules.filter(entry => entry[1].meta.deprecated);
  if (deprecatedRules.length > 0) {
    rulesTableContent += `
### Deprecated

> :warning: We're going to remove deprecated rules in the next major release. Please migrate to successor/new rules.

| Name    | Replaced by |
|:--------|:------------|
${deprecatedRules
  .map(entry => {
    let name = entry[0];
    let meta = entry[1].meta;
    let link = `[${name}](./docs/rules/${name}.md)`;
    let replacedBy =
      (meta.docs.replacedBy || []).map(id => `[${id}](./docs/rules/${id}.md)`).join(', ') ||
      '(no replacement)';
    return `| ${link} | ${replacedBy} |`;
  })
  .join('\n')}
`;
  }

  return readmeContent.replace(
    tablePlaceholder,
    `<!--RULES_TABLE_START-->\n\n${rulesTableContent}\n<!--RULES_TABLE_END-->`
  );
}

function writeReadmeFile() {
  let readmeFile = path.resolve(__dirname, '../README.md');
  fs.writeFileSync(readmeFile, generateReadme(readmeFile));
}
