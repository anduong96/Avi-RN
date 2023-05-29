import * as React from 'react';

import { IS_IOS } from '../platform';
import { Linking } from 'react-native';
import { useStripe } from '@stripe/stripe-react-native';

export function useStripeReturnUrl() {
  const stripe = useStripe();
  const [returnUrl, setReturnUrl] = React.useState<string>();

  const handleDeepLink = React.useCallback(
    async (url: string) => {
      if (url) {
        await stripe.handleURLCallback(url);
      }
    },
    [stripe],
  );

  React.useEffect(() => {
    Linking.getInitialURL().then((url) => IS_IOS && url && setReturnUrl(url));
  }, []);

  React.useEffect(() => {
    const listener = Linking.addEventListener('url', (event) =>
      handleDeepLink(event.url),
    );

    return () => {
      listener.remove();
    };
  }, [handleDeepLink]);

  return returnUrl;
}
