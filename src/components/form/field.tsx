import * as React from 'react';

import {
  ErrorText,
  FieldContainer,
  FieldContent,
  FieldMeta,
  Header,
  HintText,
  Label,
  OptionalText,
} from './styles';
import type { StyleProp, TextStyle, ViewStyle } from 'react-native';

import { Field } from 'rc-field-form';
import type { FieldProps } from 'rc-field-form/es/Field';
import type { FormInstance } from 'rc-field-form';
import type { Meta } from 'rc-field-form/es/interface';
import type { StringOrElement } from '@app/types/string.or.component';
import { StringRenderer } from '../string.renderer';
import { isEmpty } from 'lodash';
import { useTheme } from '@app/lib/hooks/use.theme';

type Props = Omit<FieldProps, 'children'> & {
  align?: 'left' | 'right' | 'center';
  label?: StringOrElement;
  hint?: string;
  hideError?: true;
  style?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
  noStyle?: boolean;
  isOptional?: boolean;
  noWarn?: boolean;
  children?:
    | React.ReactElement
    | ((form: FormInstance, meta: Meta, control: unknown) => React.ReactNode);
};

export const FormField: React.FC<Props> = ({
  name,
  label,
  children,
  noStyle,
  hideError,
  isOptional,
  style,
  labelStyle,
  hint,
  rules,
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
                hasErrors,
                ...control,
              } as any)
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
                    value={label}
                    Container={Label}
                    style={[
                      labelStyle,
                      hasErrors && { color: theme.pallette.danger },
                    ]}
                  />
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
