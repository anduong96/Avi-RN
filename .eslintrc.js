module.exports = {
  root: true,
  extends: '@react-native-community',
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'jest', 'prettier'],
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      rules: {
        '@typescript-eslint/no-shadow': ['error'],
        'no-shadow': 'off',
        'no-undef': 'off',
      },
    },
  ],
  rules: {
    'no-console': 'error',
    '@typescript-eslint/consistent-type-imports': 'error',
    'react/react-in-jsx-scope': 'off',
    'react/no-unstable-nested-components': 'off',
    'react-native/no-inline-styles': 'off',
  },
};
