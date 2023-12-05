import * as React from 'react';
import { type StyleProp, View, type ViewStyle } from 'react-native';

import type { ViewProps } from 'react-native';

import { isEmpty, isNil } from 'lodash';

import type { SpaceKeys } from '@app/themes';

import { withStyled } from '@app/lib/styled';
import { getSpaceValue } from '@app/lib/get.space.value';

type Props = React.PropsWithChildren<{
  direction?: 'column' | 'row';
  flexBasis?: number;
  flexGrow?: number;
  flexShrink?: number;
  gap?: SpaceKeys | number;
  height?: ViewStyle['height'];
  horizontalAlign?: 'center' | 'left' | 'right';
  isCentered?: boolean;
  margin?: SpaceKeys | number;
  marginBottom?: SpaceKeys | number;
  marginHorizontal?: SpaceKeys | number;
  marginLeft?: SpaceKeys | number;
  marginRight?: SpaceKeys | number;
  marginTop?: SpaceKeys | number;
  marginVertical?: SpaceKeys | number;
  overflow?: 'hidden' | 'visible';
  padding?: SpaceKeys | number;
  paddingHorizontal?: SpaceKeys | number;
  paddingVertical?: SpaceKeys | number;
  style?: StyleProp<ViewStyle>;
  verticalAlign?: 'bottom' | 'center' | 'top';
  width?: ViewStyle['width'];
}> &
  Pick<ViewProps, 'onLayout'>;

export const Group: React.FC<Props> = ({ direction = 'column', ...props }) => {
  if (isNil(props.children) || isEmpty(props.children)) {
    return null;
  }

  return <Container direction={direction} {...props} />;
};

const Container = withStyled<Props, typeof View>(View, (theme, props) => [
  {
    flexBasis: props.flexBasis,
    flexGrow: props.flexGrow,
    flexShrink: props.flexShrink,
    height: props.height,
    width: props.width,
  },
  props.direction === 'column' && [
    props.horizontalAlign === 'left' && {
      alignItems: 'flex-start',
    },
    props.horizontalAlign === 'center' && {
      alignItems: 'center',
    },
    props.horizontalAlign === 'right' && {
      alignItems: 'flex-end',
    },
    props.verticalAlign === 'top' && {
      justifyContent: 'flex-start',
    },
    props.verticalAlign === 'center' && {
      justifyContent: 'center',
    },
    props.verticalAlign === 'bottom' && {
      justifyContent: 'flex-end',
    },
  ],
  props.direction === 'row' && [
    props.horizontalAlign === 'left' && {
      justifyContent: 'flex-start',
    },
    props.horizontalAlign === 'center' && {
      justifyContent: 'center',
    },
    props.horizontalAlign === 'right' && {
      justifyContent: 'flex-end',
    },
    props.verticalAlign === 'top' && {
      alignItems: 'flex-start',
    },
    props.verticalAlign === 'center' && {
      alignItems: 'center',
    },
    props.verticalAlign === 'bottom' && {
      alignItems: 'flex-end',
    },
  ],
  !isNil(props.direction) && {
    flexDirection: props.direction,
  },
  !isNil(props.gap) && {
    gap: getSpaceValue(props.gap, theme),
  },
  !isNil(props.margin) && {
    margin: getSpaceValue(props.margin, theme),
  },
  !isNil(props.marginTop) && {
    marginTop: getSpaceValue(props.marginTop, theme),
  },
  !isNil(props.marginRight) && {
    marginRight: getSpaceValue(props.marginRight, theme),
  },
  !isNil(props.marginBottom) && {
    marginBottom: getSpaceValue(props.marginBottom, theme),
  },
  !isNil(props.marginLeft) && {
    marginLeft: getSpaceValue(props.marginLeft, theme),
  },
  !isNil(props.marginHorizontal) && {
    marginHorizontal: getSpaceValue(props.marginHorizontal, theme),
  },
  !isNil(props.marginVertical) && {
    marginVertical: getSpaceValue(props.marginVertical, theme),
  },
  !isNil(props.padding) && {
    padding: getSpaceValue(props.padding, theme),
  },
  !isNil(props.paddingHorizontal) && {
    paddingHorizontal: getSpaceValue(props.paddingHorizontal, theme),
  },
  !isNil(props.paddingVertical) && {
    paddingVertical: getSpaceValue(props.paddingVertical, theme),
  },
  props.isCentered && theme.presets.centered,
]);
