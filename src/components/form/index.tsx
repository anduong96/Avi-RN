import * as React from 'react';

import RcForm, { useForm } from 'rc-field-form';

import { FormField } from './field';

type FormType = React.FC<
  Omit<React.ComponentProps<typeof RcForm>, 'component' | 'onFinish'> & {
    onFinish: (payload: any) => void;
  }
> & {
  Field: typeof FormField;
  useForm: typeof useForm;
};

export const Form: FormType = (props) => {
  return (
    <RcForm
      component={false}
      {...props}
      initialValues={props.initialValues}
      onFinish={(payload) =>
        props.onFinish?.({
          ...(props.initialValues ?? {}),
          ...(payload ?? {}),
        })
      }
    />
  );
};

Form.Field = FormField;
Form.useForm = useForm;
