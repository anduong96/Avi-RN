module.exports = {
  plugins: [
    ['react-native-reanimated/plugin'],
    [
      'module-resolver',
      {
        alias: {
          '@app': './src',
        },
        extensions: [
          '.ios.ts',
          '.android.ts',
          '.ts',
          '.ios.tsx',
          '.android.tsx',
          '.tsx',
          '.jsx',
          '.js',
          '.json',
        ],
        root: ['./src'],
      },
    ],
  ],
  presets: ['module:@react-native/babel-preset'],
};
