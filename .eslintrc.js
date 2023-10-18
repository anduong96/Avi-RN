module.exports = {
  extends: [
    '@react-native',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'plugin:perfectionist/recommended-natural',
  ],
  ignorePatterns: ['**/*.js', 'generated/**/*'],
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
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'jest', 'prettier', 'perfectionist'],
  root: true,
  rules: {
    '@typescript-eslint/consistent-type-imports': 'error',
    'no-console': 'error',
    'perfectionist/sort-imports': [
      'error',
      {
        'custom-groups': {
          type: {
            react: 'react',
          },
          value: {
            react: ['react', 'react-*'],
          },
        },
        groups: [
          'side-effect',
          'type',
          'react',
          'unknown',
          ['builtin', 'external'],
          'internal-type',
          'internal',
          ['parent-type', 'sibling-type', 'index-type'],
          ['parent', 'sibling', 'index'],
          'style',
        ],
        'internal-pattern': ['@app/**'],
        'newlines-between': 'always',
        order: 'asc',
        type: 'line-length',
      },
    ],
    'react/no-unstable-nested-components': 'off',
    'react/react-in-jsx-scope': 'off',
    'react-native/no-inline-styles': 'off',
  },
};
