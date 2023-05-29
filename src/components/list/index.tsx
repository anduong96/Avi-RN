import * as React from 'react';

import type { StyleProp, ViewProps, ViewStyle } from 'react-native';

import { Container } from './styles';
import { isEmpty } from 'lodash';
import { useTheme } from '@app/lib/hooks/use.theme';

type Props<T> = {
  data?: T[];
  gap?: number;
  horizontal?: boolean;
  wrap?: boolean;
  style?: StyleProp<ViewStyle>;
  EmptyComponent?: React.FC | React.ReactElement;
  separator?: () => React.ReactElement;
  keyExtractor?: (item: T, index: number) => string | number;
  renderItem: (item: T, index: number) => React.ReactElement | null | undefined;
  type?: 'clear' | 'fill' | 'outline';
  align?: 'left' | 'center' | 'right';
} & Pick<ViewProps, 'onLayout'>;

export function List<T>({
  data = [],
  horizontal,
  style,
  wrap,
  type = 'clear',
  align,
  gap,
  EmptyComponent,
  separator,
  keyExtractor,
  renderItem,
  ...props
}: Props<T>) {
  const theme = useTheme();
  const lastIndex = data.length - 1;
  const children = data.map((item, index) => (
    <React.Fragment key={keyExtractor?.(item, index) || index}>
      {lastIndex !== -1 && index !== 0 && separator?.()}
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
          // @ts-ignore
          <EmptyComponent />
        )
      ) : (
        children
      )}
    </Container>
  );
}
