import { useNavigation } from '@react-navigation/native';

import { vibrate } from '../haptic.feedback';

export function useExitPage() {
  const navigation = useNavigation();

  const handleExit = () => {
    vibrate('effectClick');
    if (navigation.canGoBack()) {
      navigation.goBack();
    } else if (
      'popToTop' in navigation &&
      typeof navigation.popToTop === 'function'
    ) {
      navigation.popToTop();
    }
  };

  return handleExit;
}
