import * as React from 'react';

import type { LayoutRectangle, StyleProp, ViewStyle } from 'react-native';

import { View } from 'react-native';
import { styled } from '@app/lib/styled';

type Props = {
  dashSize?: number;
  isVertical?: boolean;
  style?: StyleProp<ViewStyle>;
};

export const DividerDashed: React.FC<Props> = ({
  style,
  isVertical = false,
  dashSize = 2,
}) => {
  const [layout, setLayout] = React.useState<LayoutRectangle>({
    width: 0,
    height: 0,
    x: 0,
    y: 0,
  });

  const count = Math.ceil(
    isVertical ? layout.height / (dashSize * 2) : layout.width / (dashSize * 2),
  );

  return (
    <Container
      onLayout={(e) => setLayout(e.nativeEvent.layout)}
      style={[
        {
          justifyContent: 'space-evenly',
          flexDirection: isVertical ? 'column' : 'row',
        },
        style,
      ]}
    >
      {Array.from({ length: count }).map((_, i) => (
        <Dash key={i.toString()} isVertical={isVertical} size={dashSize} />
      ))}
    </Container>
  );
};

const Container = styled(View, () => [{}]);

const Dash = styled<{ size: number; isVertical: boolean }, typeof View>(
  View,
  (theme, props) => [
    {
      backgroundColor: theme.pallette.grey[300],
    },
    props.isVertical && {
      height: props.size,
      width: 1,
    },
    !props.isVertical && {
      width: props.size,
      height: 1,
    },
  ],
);
