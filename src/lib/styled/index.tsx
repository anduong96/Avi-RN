import * as React from 'react';

import type { ImageStyle, StyleProp, TextStyle, ViewStyle } from 'react-native';

import type { EdgeInsets } from 'react-native-safe-area-context';
import type { Theme } from '../../themes';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../hooks/use.theme';

type Styles = ViewStyle | TextStyle | ImageStyle;
type CustomTheme = Theme & { insets: EdgeInsets };

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
  style?:
    | StyleProp<Styles>
    | ((
        theme: CustomTheme,
        props: React.ComponentProps<C> & D,
      ) => StyleProp<Styles>),
  initProps?:
    | Partial<React.ComponentProps<C>>
    | ((theme: CustomTheme) => Partial<React.ComponentProps<C>>),
) {
  type P = React.ComponentProps<C> & D;
  return React.forwardRef((props: P, ref) => {
    const theme = useTheme();
    const insets = useSafeAreaInsets();
    const combinedTheme = { ...theme, insets };
    const isStyleFn = typeof style === 'function';
    const isPropFn = typeof initProps === 'function';
    const resolvedStyle = isStyleFn ? style(combinedTheme, props) : style;
    const defaultPropsResolved = isPropFn
      ? initProps(combinedTheme)
      : initProps;

    return (
      // @ts-ignore
      <Component
        {...(defaultPropsResolved ?? {})}
        {...props}
        ref={ref}
        style={[resolvedStyle, props.style]}
      />
    );
  });
}
