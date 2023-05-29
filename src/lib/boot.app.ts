import RNBootSplash from 'react-native-bootsplash';

export async function bootApp() {
  await RNBootSplash.hide({
    fade: true,
    duration: 300,
  });
}
