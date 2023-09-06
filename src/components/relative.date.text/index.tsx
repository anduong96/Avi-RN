import * as React from 'react';

import { Text } from 'react-native';
import type { TextProps } from 'react-native';
import moment from 'moment';

type Props = Omit<TextProps, 'children'> & {
  value: Date;
};

export const RelativeDateText: React.FC<Props> = ({ value, ...props }) => {
  const now = moment();
  const daysDiff = now.diff(value, 'days') * -1;
  const display = daysDiff === 0 ? 'Now' : daysDiff.toString();
  return <Text {...props}>{display}</Text>;
};
