require('@rushstack/eslint-config/patch/modern-module-resolution');
module.exports = {
  extends: ['@microsoft/eslint-config-spfx/lib/profiles/react'],
  parserOptions: { tsconfigRootDir: __dirname },
  rules: {
    'quotes': ['error', 'single'],
    '@typescript-eslint/no-non-null-assertion': 'off'
  }
};
