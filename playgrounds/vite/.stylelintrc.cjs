// https://stylelint.io/user-guide/configuration
// https://jsrepos.com/lib/ota-meshi-stylelint-config-standard-vue

module.exports = {
  extends: [
    'stylelint-config-standard-scss', // configure for SCSS
    'stylelint-config-standard-vue/scss', // configure for SCSS in Vue
    'stylelint-config-recess-order',
  ],
  overrides: [
    {
      files: ['*.vue', '**/*.vue', '*.scss', '**/*.scss'],
      rules: {
        'unit-allowed-list': ['px', '%', 'vh', 'vw', 'deg', 'fr', 'ms', 'rem', 'em'],
        'value-no-vendor-prefix': [true, { ignoreValues: ["box"] }],
        'alpha-value-notation': 'number',
        'max-line-length': 150,
      },
    },
    {
      files: ['*.scss', '**/*.scss'],
      rules: {
        'selector-class-pattern': ['[\_\-a-zA-Z0-9]+', { resolveNestedSelectors: true }],
      }
    },
    {
      files: ['*.vue', '**/*.vue'],
      rules: {
        'selector-class-pattern': ['((mk|pux)-[A-Z][a-zA-Z0-9]+)|v-[\-a-z]', { resolveNestedSelectors: false }],
      },
    }
  ],
  rules: {
    indentation: [4, { baseIndentLevel: 0 }],
  },
};