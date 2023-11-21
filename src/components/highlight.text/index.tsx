import type Fuse from 'fuse.js';

import * as React from 'react';
import { Text } from 'react-native';

import type { StyleProp, TextStyle } from 'react-native';

import { splitMatches } from './split.matches';

type Props = {
  children: string;
  matchKey: string;
  matchStyle?: StyleProp<TextStyle>;
  matches?: readonly Fuse.FuseResultMatch[];
  style?: StyleProp<TextStyle>;
};
export const HighlightedText: React.FC<Props> = ({
  children,
  matchKey,
  matchStyle,
  matches = [],
  style,
}) => {
  const parts = splitMatches({
    matchKey,
    matches,
    text: children,
  });

  return (
    <Text style={[style]}>
      {parts.map((entry, index) =>
        entry.isMatch ? (
          <Text key={index} style={[{ fontWeight: 'bold' }, matchStyle]}>
            {entry.text}
          </Text>
        ) : (
          entry.text
        ),
      )}
    </Text>
  );
};
