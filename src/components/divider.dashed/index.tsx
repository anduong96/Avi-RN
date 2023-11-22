import * as React from 'react';
import { View } from 'react-native';

import type { LayoutRectangle, StyleProp, ViewStyle } from 'react-native';

import { withStyled } from '@app/lib/styled';

type Props = {
  dashSize?: number;
  dashThickness?: number;
  isVertical?: boolean;
  style?: StyleProp<ViewStyle>;
};

export const DividerDashed: React.FC<Props> = ({
  dashSize = 2,
  dashThickness = 1,
  isVertical = false,
  style,
}) => {
  const [layout, setLayout] = React.useState<LayoutRectangle>({
    height: 0,
    width: 0,
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
          flexDirection: isVertical ? 'column' : 'row',
          justifyContent: 'space-evenly',
        },
        style,
      ]}
    >
      {Array.from({ length: count }).map((_, i) => (
        <Dash
          dashThickness={dashThickness}
          isVertical={isVertical}
          key={i.toString()}
          size={dashSize}
        />
      ))}
    </Container>
  );
};

const Container = withStyled(View, () => [
  {
    position: 'absolute',
    width: '100%',
  },
]);

const Dash = withStyled<
  Pick<Props, 'dashThickness' | 'isVertical'> & {
    size: number;
  },
  typeof View
>(View, (theme, props) => [
  {
    backgroundColor: theme.pallette.borderColor,
  },
  props.isVertical && {
    height: props.size,
    width: props.dashThickness,
  },
  !props.isVertical && {
    height: props.dashThickness,
    width: props.size,
  },
]);
