import type Fuse from 'fuse.js';
import * as React from 'react';
import type { StyleProp, TextStyle } from 'react-native';
import { Text } from 'react-native';
import { splitMatches } from './split.matches';

type Props = {
  matchKey: string;
  matches?: readonly Fuse.FuseResultMatch[];
  children: string;
  style?: StyleProp<TextStyle>;
  matchStyle?: StyleProp<TextStyle>;
};
export const HighlightedText: React.FC<Props> = ({
  matches = [],
  matchKey,
  children,
  style,
  matchStyle,
}) => {
  const parts = splitMatches({
    text: children,
    matches,
    matchKey,
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
