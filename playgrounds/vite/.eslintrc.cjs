// eslint-disable-next-line import/no-extraneous-dependencies
require('@rushstack/eslint-patch/modern-module-resolution');

module.exports = {
  root: true,
  env: {
    'vue/setup-compiler-macros': true,
  },
  parser: 'vue-eslint-parser',
  parserOptions: {
    project: 'tsconfig.app.json',
    tsconfigRootDir: __dirname,
    parser: '@typescript-eslint/parser'
  },
  extends: [
    'plugin:vue/vue3-recommended',
    '@vue/eslint-config-typescript/recommended',
    'airbnb-base',
    'airbnb-typescript/base',
  ],
  rules: {
    'import/no-unresolved': 'off',
    'import/extensions': 'off',
    'no-restricted-syntax': 'off',
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": ["error"],
    "@typescript-eslint/member-delimiter-style": ["error", {
      "multiline": {
        "delimiter": "semi",
        "requireLast": true
      },
      "singleline": {
        "delimiter": "semi",
        "requireLast": false
      },
      "multilineDetection": "brackets"
    }],
    "max-len": ["error", { code: 150 }],
    "import/prefer-default-export": "off"
  },
  ignorePatterns: [
    '.eslintrc.cjs',
    '.stylelintrc.cjs', 
    'vite.config.ts', 
    'dist',
  ],
};
