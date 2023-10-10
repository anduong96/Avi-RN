import message from '@react-native-firebase/messaging';

import { useAwaitedMount } from './use.awaited.mount';

/**
 * The function `useFcmToken` returns a promise that resolves to the Firebase Cloud Messaging (FCM)
 * token.
 * @returns The `useFcmToken` function returns the result of calling the `useAwaitedMount` function
 * with a callback function that calls `message().getToken()`.
 */
export function useFcmToken() {
  return useAwaitedMount(() => message().getToken());
}
