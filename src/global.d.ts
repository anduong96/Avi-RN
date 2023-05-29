declare module '@env';

declare module 'react-native-markdown-package' {
  import type { Linking } from 'react-native';
  import { Component } from 'react';

  class Markdown extends Component<{
    enableLightBox?: boolean;
    navigator?: unknown;
    imageParam?: unknown;
    onLink?: (url: string) => ReturnType<(typeof Linking)['openURL']>;
    bgImage?: unknown;
    onImageOpen?: unknown;
    onImageClose?: unknown;
    rules?: unknown;
    styles?: unknown;
    children: string;
  }> {}

  export = Markdown;
}
