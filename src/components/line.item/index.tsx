import * as React from 'react';

import { Container, Label, Value } from './styles';

import { StringRenderer } from '../string.renderer';
import { useTheme } from '@app/lib/hooks/use.theme';

type Props<T> = {
  label: string;
  value: T;
  formatValue?: (value: T) => string;
  variant?: 'default' | 'secondary';
  size?: 'default' | 'small' | 'large' | number;
  boldValue?: boolean;
};

export function LineItem<T>({
  label,
  value,
  boldValue,
  formatValue = (v: T) => (v ? String(v) : ''),
  variant = 'default',
  size = 'default',
}: Props<T>) {
  const theme = useTheme();

  return (
    <Container>
      <Label
        style={[
          variant === 'secondary' && { color: theme.typography.secondaryColor },
          size === 'large' && {
            fontSize: theme.typography.presets.h3.fontSize,
          },
          typeof size === 'number' && {
            fontSize: size,
          },
        ]}
      >
        {label}
      </Label>
      <StringRenderer
        value={formatValue(value)}
        Container={Value}
        style={[
          boldValue && { fontWeight: '900' },
          size === 'large' && {
            fontSize: theme.typography.presets.h3.fontSize,
          },
          typeof size === 'number' && {
            fontSize: size,
          },
        ]}
      />
    </Container>
  );
}
