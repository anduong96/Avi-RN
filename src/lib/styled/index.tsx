import type { EdgeInsets } from 'react-native-safe-area-context';
import type { ImageStyle, StyleProp, TextStyle, ViewStyle } from 'react-native';

import * as React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { compact, merge } from 'lodash';

import type { Theme } from '../../themes';

import { useTheme } from '../hooks/use.theme';

type Styles = ImageStyle | TextStyle | ViewStyle;
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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  C extends React.ComponentType<any> | (new (props: any) => any),
>(
  Component: C,
  style?:
    | ((
        theme: CustomTheme,
        props: React.ComponentPropsWithRef<C> & D,
      ) => StyleProp<Styles>)
    | StyleProp<Styles>,
  finalProps?:
    | ((
        theme: CustomTheme,
        props: React.ComponentPropsWithRef<C> & D,
      ) =>
        | Array<Partial<React.ComponentPropsWithRef<C>>>
        | Partial<React.ComponentPropsWithRef<C>>)
    | Array<Partial<React.ComponentPropsWithRef<C>>>
    | Partial<React.ComponentPropsWithRef<C>>,
): React.FC<React.ComponentPropsWithRef<C> & D> {
  type P = React.ComponentPropsWithRef<C> & D;
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  return React.forwardRef<C, P>((props, ref) => {
    const theme = useTheme();
    const insets = useSafeAreaInsets();
    const combinedTheme = { ...theme, insets };
    const isStyleFn = typeof style === 'function';
    const isPropFn = typeof finalProps === 'function';
    const resolvedStyle = isStyleFn ? style(combinedTheme, props) : style;
    const resolvedProps = isPropFn
      ? finalProps(combinedTheme, props)
      : finalProps;
    const resolvedPropsObj = Array.isArray(resolvedProps)
      ? // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-expect-error
        merge(...compact(resolvedProps))
      : resolvedProps;

    return (
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      <Component
        {...props}
        {...resolvedPropsObj}
        ref={ref}
        style={[resolvedStyle, props.style]}
      />
    );
  });
}
