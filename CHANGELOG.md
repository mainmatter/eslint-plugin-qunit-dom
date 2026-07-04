# Changelog






## Release (2026-07-03)

* eslint-plugin-qunit-dom 1.0.0 (major)

#### :boom: Breaking Change
* `eslint-plugin-qunit-dom`
  * [#445](https://github.com/mainmatter/eslint-plugin-qunit-dom/pull/445) Drop support for Node < 22 ([@nickschot](https://github.com/nickschot))

#### :rocket: Enhancement
* `eslint-plugin-qunit-dom`
  * [#336](https://github.com/mainmatter/eslint-plugin-qunit-dom/pull/336) Add require-assertion rule ([@backspace](https://github.com/backspace))
  * [#220](https://github.com/mainmatter/eslint-plugin-qunit-dom/pull/220) Rebrand simplabs to Mainmatter ([@BobrImperator](https://github.com/BobrImperator))
  * [#37](https://github.com/mainmatter/eslint-plugin-qunit-dom/pull/37) Reimplement `no-checked-selector` rule ([@Turbo87](https://github.com/Turbo87))
  * [#36](https://github.com/mainmatter/eslint-plugin-qunit-dom/pull/36) no-ok-find: Add support for `assert.equal(find(...).length, 1)` assertions ([@Turbo87](https://github.com/Turbo87))

#### :bug: Bug Fix
* `eslint-plugin-qunit-dom`
  * [#450](https://github.com/mainmatter/eslint-plugin-qunit-dom/pull/450) fix the repo - no caps ([@mansona](https://github.com/mansona))
  * [#35](https://github.com/mainmatter/eslint-plugin-qunit-dom/pull/35) no-ok-find: Fix parent scope guards ([@Turbo87](https://github.com/Turbo87))
  * [#34](https://github.com/mainmatter/eslint-plugin-qunit-dom/pull/34) no-ok-find: Fix false positive due to incorrect regex ([@Turbo87](https://github.com/Turbo87))

#### :memo: Documentation
* `eslint-plugin-qunit-dom`
  * [#249](https://github.com/mainmatter/eslint-plugin-qunit-dom/pull/249) Automate docs with eslint-doc-generator ([@bmish](https://github.com/bmish))

#### :house: Internal
* `eslint-plugin-qunit-dom`
  * [#448](https://github.com/mainmatter/eslint-plugin-qunit-dom/pull/448) start using release-plan ([@mansona](https://github.com/mansona))
  * [#33](https://github.com/mainmatter/eslint-plugin-qunit-dom/pull/33) no-ok-find: Simplify error messages ([@Turbo87](https://github.com/Turbo87))

#### Committers: 6
- Bartlomiej Dudzik ([@BobrImperator](https://github.com/BobrImperator))
- Bryan Mishkin ([@bmish](https://github.com/bmish))
- Buck Doyle ([@backspace](https://github.com/backspace))
- Chris Manson ([@mansona](https://github.com/mansona))
- Nick Schot ([@nickschot](https://github.com/nickschot))
- Tobias Bieniek ([@Turbo87](https://github.com/Turbo87))



## v0.2.0 (2021-09-16)

#### :rocket: Enhancement
* [#28](https://github.com/Mainmatter/eslint-plugin-qunit-dom/pull/28) Reimplement `no-ok-find` rule ([@Turbo87](https://github.com/Turbo87))

#### Committers: 1
- Tobias Bieniek ([@Turbo87](https://github.com/Turbo87))

## v0.1.1 (2021-09-16)

#### :rocket: Enhancement
* [#27](https://github.com/Mainmatter/eslint-plugin-qunit-dom/pull/27) Add `.npmignore` file ([@Turbo87](https://github.com/Turbo87))

#### Committers: 1
- Tobias Bieniek ([@Turbo87](https://github.com/Turbo87))

## v0.1.0 (2021-09-16)

#### :boom: Breaking Change
* [#13](https://github.com/Mainmatter/eslint-plugin-qunit-dom/pull/13) Drop support for Node.js 10 ([@Turbo87](https://github.com/Turbo87))

#### :rocket: Enhancement
* [#23](https://github.com/Mainmatter/eslint-plugin-qunit-dom/pull/23) Export `recommended` ESLint config ([@Turbo87](https://github.com/Turbo87))
* [#17](https://github.com/Mainmatter/eslint-plugin-qunit-dom/pull/17) rules: Add metadata ([@Turbo87](https://github.com/Turbo87))

#### :bug: Bug Fix
* [#22](https://github.com/Mainmatter/eslint-plugin-qunit-dom/pull/22) Automatically export all rules ([@Turbo87](https://github.com/Turbo87))

#### :memo: Documentation
* [#24](https://github.com/Mainmatter/eslint-plugin-qunit-dom/pull/24) Add README and LICENSE files ([@Turbo87](https://github.com/Turbo87))
* [#1](https://github.com/Mainmatter/eslint-plugin-qunit-dom/pull/1) Add rule docs ([@Turbo87](https://github.com/Turbo87))

#### :house: Internal
* [#25](https://github.com/Mainmatter/eslint-plugin-qunit-dom/pull/25) Use `release-it` for releases ([@Turbo87](https://github.com/Turbo87))
* [#26](https://github.com/Mainmatter/eslint-plugin-qunit-dom/pull/26) ESLint: Enable for hidden files too ([@Turbo87](https://github.com/Turbo87))
* [#19](https://github.com/Mainmatter/eslint-plugin-qunit-dom/pull/19) Add local ESLint config and run it on CI ([@Turbo87](https://github.com/Turbo87))
* [#18](https://github.com/Mainmatter/eslint-plugin-qunit-dom/pull/18) rules: Use `messageId` instead of `message` ([@Turbo87](https://github.com/Turbo87))
* [#16](https://github.com/Mainmatter/eslint-plugin-qunit-dom/pull/16) no-checked-selector: Remove unused variable ([@Turbo87](https://github.com/Turbo87))
* [#15](https://github.com/Mainmatter/eslint-plugin-qunit-dom/pull/15) Adjust prettier config ([@Turbo87](https://github.com/Turbo87))
* [#14](https://github.com/Mainmatter/eslint-plugin-qunit-dom/pull/14) CI: Use `pnpm` v6 and cache dependencies ([@Turbo87](https://github.com/Turbo87))
* [#12](https://github.com/Mainmatter/eslint-plugin-qunit-dom/pull/12) Use pnpm instead of yarn ([@Turbo87](https://github.com/Turbo87))
* [#10](https://github.com/Mainmatter/eslint-plugin-qunit-dom/pull/10) CI: Split `release` job into dedicated workflow ([@Turbo87](https://github.com/Turbo87))
* [#9](https://github.com/Mainmatter/eslint-plugin-qunit-dom/pull/9) CI: Remove `cron` schedule ([@Turbo87](https://github.com/Turbo87))
* [#3](https://github.com/Mainmatter/eslint-plugin-qunit-dom/pull/3) Configure Renovate ([@renovate[bot]](https://github.com/apps/renovate))

#### Committers: 2
- Patsy Issa ([@patsy-issa](https://github.com/patsy-issa))
- Tobias Bieniek ([@Turbo87](https://github.com/Turbo87))

