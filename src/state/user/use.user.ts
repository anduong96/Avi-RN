import { useUserState } from '.';

export function useUser() {
  return useUserState((state) => state.user);
}
