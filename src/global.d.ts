declare module '@env';

declare module 'react-native-markdown-package' {
  import type { Linking } from 'react-native';

  import { Component } from 'react';

  class Markdown extends Component<{
    bgImage?: unknown;
    children: string;
    enableLightBox?: boolean;
    imageParam?: unknown;
    navigator?: unknown;
    onImageClose?: unknown;
    onImageOpen?: unknown;
    onLink?: (url: string) => ReturnType<(typeof Linking)['openURL']>;
    rules?: unknown;
    styles?: unknown;
  }> {}

  export = Markdown;
}
