import React from 'react';
import { StyleSheet } from 'react-native';

import { BlurredView } from './view';

type Props = React.ComponentProps<typeof BlurredView>;

export const BlurredBackground: React.FC<Props> = (props) => {
  return (
    <BlurredView
      {...props}
      style={[StyleSheet.absoluteFillObject, props.style]}
    />
  );
};
