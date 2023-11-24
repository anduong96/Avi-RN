import * as React from 'react';
import { View } from 'react-native';

import type { StyleProp, ViewProps, ViewStyle } from 'react-native';

import { isEmpty } from 'lodash';

import { withStyled } from '@app/lib/styled';
import { useTheme } from '@app/lib/hooks/use.theme';

type Props<T> = {
  EmptyComponent?: React.FC | React.ReactElement;
  align?: 'center' | 'left' | 'right';
  data?: T[];
  gap?: number;
  horizontal?: boolean;
  keyExtractor?: (item: T, index: number) => number | string;
  renderItem: (item: T, index: number) => React.ReactElement | null | undefined;
  separator?: (item: T, index: number) => React.ReactElement;
  style?: StyleProp<ViewStyle>;
  type?: 'clear' | 'fill' | 'outline';
  wrap?: boolean;
} & Pick<ViewProps, 'onLayout'>;

export function List<T>({
  EmptyComponent,
  align,
  data = [],
  gap,
  horizontal,
  keyExtractor,
  renderItem,
  separator,
  style,
  type = 'clear',
  wrap,
  ...props
}: Props<T>) {
  const theme = useTheme();
  const lastIndex = data.length - 1;
  const children = data.map((item, index) => (
    <React.Fragment key={keyExtractor?.(item, index) || index}>
      {lastIndex !== -1 && index !== 0 && separator?.(item, index)}
      {renderItem(item, index)}
    </React.Fragment>
  ));

  return (
    <Container
      {...props}
      style={[
        { gap },
        wrap && { flexWrap: 'wrap' },
        type === 'fill' && { backgroundColor: theme.pallette.grey[100] },
        type === 'outline' && [theme.presets.outlinedBox],
        horizontal && [
          { flexDirection: 'row' },
          align === 'left' && { justifyContent: 'flex-start' },
          align === 'right' && { justifyContent: 'flex-end' },
          align === 'center' && { justifyContent: 'center' },
        ],
        style,
      ]}
    >
      {isEmpty(children) && EmptyComponent ? (
        React.isValidElement(EmptyComponent) ? (
          EmptyComponent
        ) : (
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-expect-error
          <EmptyComponent />
        )
      ) : (
        children
      )}
    </Container>
  );
}

const Container = withStyled(View, () => ({}));
