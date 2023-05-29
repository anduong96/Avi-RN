import { Dimensions, Platform } from 'react-native';

const WINDOW = Dimensions.get('window');
export const WINDOW_HEIGHT = WINDOW.height;
export const WINDOW_WIDTH = WINDOW.width;
export const IS_IOS = Platform.OS === 'ios';
export const IS_ANDROID = Platform.OS === 'android';
