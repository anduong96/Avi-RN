import { MMKVLoader } from 'react-native-mmkv-storage';

export const storage = new MMKVLoader().withEncryption().initialize();
