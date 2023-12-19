import type { FormInstance } from 'rc-field-form';
import type { Meta } from 'rc-field-form/es/interface';
import type { FieldProps } from 'rc-field-form/es/Field';

import * as React from 'react';
import { Text, View } from 'react-native';

import type { StyleProp, TextStyle, ViewStyle } from 'react-native';

import { isEmpty } from 'lodash';
import { Field } from 'rc-field-form';

import type { StringOrElement } from '@app/types/string.or.component';

import { useTheme } from '@app/lib/hooks/use.theme';

import { withStyled } from '../../lib/styled';
import { StringRenderer } from '../string.renderer';

type Props = Omit<FieldProps, 'children'> & {
  align?: 'center' | 'left' | 'right';
  children?:
    | ((form: FormInstance, meta: Meta, control: unknown) => React.ReactNode)
    | React.ReactElement;
  hideError?: true;
  hint?: string;
  isOptional?: boolean;
  label?: StringOrElement;
  labelStyle?: StyleProp<TextStyle>;
  noStyle?: boolean;
  noWarn?: boolean;
  style?: StyleProp<ViewStyle>;
};

export const FormField: React.FC<Props> = ({
  children,
  hideError,
  hint,
  initialValue,
  isOptional,
  label,
  labelStyle,
  name,
  noStyle,
  rules,
  style,
  ...restProps
}) => {
  const theme = useTheme();
  return (
    <Field name={name} rules={rules} {...restProps}>
      {(control, meta, form) => {
        const hasErrors = !isEmpty(meta.errors);
        const isNotRequired =
          rules?.some((rule) =>
            'required' in rule ? !rule.required : false,
          ) || isOptional;

        const childNode =
          typeof children === 'function'
            ? children(form, meta, control)
            : React.isValidElement(children)
              ? React.cloneElement(children, {
                  ...control,
                  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                  // @ts-expect-error
                  hasErrors,
                  value: control.value ?? initialValue,
                })
              : null;

        if (noStyle) {
          return childNode;
        }

        const getMeta = () => {
          if (!hideError && hasErrors) {
            return (
              <FieldMeta>
                <ErrorText>{meta.errors[0]}</ErrorText>
              </FieldMeta>
            );
          } else if (hint) {
            return (
              <FieldMeta>
                <HintText>{hint}</HintText>
              </FieldMeta>
            );
          }

          return null;
        };

        return (
          <FieldContainer style={[style]}>
            <FieldContent>
              {label && (
                <Header>
                  <StringRenderer
                    Container={Label}
                    style={[
                      labelStyle,
                      hasErrors && { color: theme.pallette.danger },
                    ]}
                  >
                    {label}
                  </StringRenderer>
                  {isNotRequired && <OptionalText>optional</OptionalText>}
                </Header>
              )}
              {childNode}
            </FieldContent>
            {getMeta()}
          </FieldContainer>
        );
      }}
    </Field>
  );
};

const FieldContainer = withStyled(View, (theme) => ({
  marginBottom: theme.space.medium,
}));

const FieldContent = withStyled(View, {});
const FieldMeta = withStyled(View, {
  paddingVertical: 5,
});
const ErrorText = withStyled(Text, (theme) => ({
  color: theme.pallette.danger,
}));

const HintText = withStyled(Text, (theme) => [
  theme.typography.presets.small,
  {
    color: theme.pallette.grey[500],
  },
]);

const Label = withStyled(Text, (theme) => ({
  color: theme.pallette.text,
}));

const OptionalText = withStyled(Text, (theme) => ({
  color: theme.pallette.textSecondary,
  fontSize: theme.typography.presets.small.fontSize,
  fontWeight: '400',
  marginBottom: 1,
  marginLeft: theme.space.tiny,
}));

const Header = withStyled(View, (theme) => ({
  alignItems: 'flex-end',
  flexDirection: 'row',
  marginBottom: theme.space.tiny,
}));
