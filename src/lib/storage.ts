import { MMKV } from 'react-native-mmkv';

import { MMKVStorageWrapper } from 'apollo3-cache-persist';

export const storage = new MMKV();

export const getApolloStorage = () =>
  new MMKVStorageWrapper({
    getItem: async (key) => storage.getString(key),
    removeItem: async (key): Promise<undefined> => {
      storage.delete(key);
    },
    setItem: async (key, value): Promise<undefined> => {
      storage.set(key, value);
    },
  });
