import { describe, it, expect } from 'vitest';

import { configs } from './index.js';

describe('configs', () => {
  it('recommended is stable', () => {
    // if you change the list of recommended rules, make sure to release this
    // as a breaking change!!

    expect(configs.recommended).toMatchInlineSnapshot(`
      {
        "plugins": [
          "qunit-dom",
        ],
        "rules": {
          "qunit-dom/no-checked-selector": "error",
          "qunit-dom/no-ok-find": "error",
          "qunit-dom/require-assertion": "error",
        },
      }
    `);
  });
});
