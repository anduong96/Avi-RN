import * as React from 'react';

import { Linking, StyleSheet } from 'react-native';

import RnMarkdown from 'react-native-markdown-package';

type Props = {
  value: string;
};

export const Markdown: React.FC<Props> = ({ value }) => {
  const handleLink = async (url: string) => {
    if (await Linking.canOpenURL(url)) {
      Linking.openURL(url);
    }
  };

  return (
    <RnMarkdown onLink={handleLink} styles={styles}>
      {value}
    </RnMarkdown>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    margin: 10,
    padding: 20,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
