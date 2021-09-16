const fs = require('fs');
const path = require('path');
const { generateReadme } = require('./scripts/update-readme');

describe('README.md', () => {
  it('is up-to-date', () => {
    const readmePath = path.resolve(__dirname, './README.md');
    const readmeContent = fs.readFileSync(readmePath, 'utf8');
    expect(readmeContent).toEqual(generateReadme(readmePath));
  });
});
