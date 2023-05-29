import * as React from 'react';

import type { ImageStyle, StyleProp, TextStyle, ViewStyle } from 'react-native';

import type { EdgeInsets } from 'react-native-safe-area-context';
import type { Theme } from '../../themes';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../hooks/use.theme';

type Styles = ViewStyle | TextStyle | ImageStyle;

/**
 * It takes a React component and a style object, and returns a new React component that renders the
 * original component with the style applied
 * @param {C} Component - The component you want to style.
 * @returns A function that takes a component and a style and returns a component with the style
 * applied.
 */
export function styled<
  D,
  C extends React.ComponentType<any> | (new (props: any) => any),
>(
  Component: C,
  style:
    | StyleProp<Styles>
    | ((
        theme: Theme & { insets: EdgeInsets },
        props: React.ComponentProps<C> & D,
      ) => StyleProp<Styles>),
  defaultProps?: React.ComponentProps<C>,
) {
  type P = React.ComponentProps<C> & D;
  const output =
    typeof style === 'function'
      ? React.forwardRef((props: P, ref) => {
          const theme = useTheme();
          const insets = useSafeAreaInsets();
          return (
            // @ts-ignore
            <Component
              {...(defaultProps ?? {})}
              {...props}
              ref={ref}
              style={[
                style(
                  {
                    ...theme,
                    insets,
                  },
                  props,
                ),
                props.style,
              ]}
            />
          );
        })
      : (props: P) => {
          return (
            // @ts-ignore
            <Component {...(defaultProps ?? {})} {...props} style={style} />
          );
        };

  return output;
}
