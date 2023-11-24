import * as React from 'react';
import { View } from 'react-native';

import type {
  LayoutRectangle,
  StyleProp,
  ViewProps,
  ViewStyle,
} from 'react-native';

import { logger } from '@app/lib/logger';
import { withStyled } from '@app/lib/styled';

type Props = {
  dashColor?: string;
  dashSize?: number;
  dashThickness?: number;
  isVertical?: boolean;
  style?: StyleProp<ViewStyle>;
};

export const DividerDashed: React.FC<Props> = ({
  dashColor,
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

  const handleLayout: ViewProps['onLayout'] = (e) => {
    setLayout(e.nativeEvent.layout);

    if (dashSize === 4) {
      logger.debug(e.nativeEvent.layout.width);
    }
  };

  const count = Math.ceil(
    isVertical ? layout.height / (dashSize * 2) : layout.width / (dashSize * 2),
  );

  return (
    <Container isVertical={isVertical} onLayout={handleLayout} style={[style]}>
      {Array.from({ length: count }).map((_, i) => (
        <Dash
          dashColor={dashColor}
          dashThickness={dashThickness}
          isVertical={isVertical}
          key={i.toString()}
          size={dashSize}
        />
      ))}
    </Container>
  );
};

const Container = withStyled<Pick<Props, 'isVertical'>, typeof View>(
  View,
  (_, props) => [
    {
      flexDirection: props.isVertical ? 'column' : 'row',
      flexGrow: 1,
      justifyContent: 'space-between',
      position: 'absolute',
    },
    props.isVertical && {
      bottom: 0,
      top: 0,
    },
    !props.isVertical && {
      left: 0,
      right: 0,
    },
  ],
);

const Dash = withStyled<
  Pick<Props, 'dashColor' | 'dashThickness' | 'isVertical'> & {
    size: number;
  },
  typeof View
>(View, (theme, props) => [
  {
    backgroundColor: props.dashColor || theme.pallette.borderColor,
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
