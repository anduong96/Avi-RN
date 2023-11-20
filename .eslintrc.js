module.exports = {
  extends: [
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
  plugins: [
    'react',
    'react-native',
    '@typescript-eslint',
    'jest',
    'prettier',
    'perfectionist',
  ],
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
            'react-native': 'react-native',
          },
          value: {
            react: ['react', 'react-*'],
            'react-native': ['react-native', 'react-native-*'],
          },
        },
        groups: [
          'side-effect',
          'type',
          'react',
          'react-native',
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
  },
};
