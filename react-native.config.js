module.exports = {
  dependencies: {
    'react-native-vector-icons': {
      platforms: {
        ios: null,
      },
    },
  },
  project: {
    ios: {
      sourceDir: './ios',
      automaticPodsInstallation: true,
    },
  },
  assets: ['./assets/fonts'],
};
