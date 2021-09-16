'use strict';

const fs = require('fs');
const path = require('path');

module.exports = {
  rules: generateRulesMap(),
};

function generateRulesMap() {
  let rulesPath = path.join(__dirname, 'rules');
  let files = fs.readdirSync(rulesPath);

  let rulesMap = {};
  for (let file of files) {
    if (file.endsWith('.js') && !file.endsWith('.test.js')) {
      let ruleName = path.parse(file).name;
      rulesMap[ruleName] = require(`./rules/${file}`);
    }
  }
  return rulesMap;
}
