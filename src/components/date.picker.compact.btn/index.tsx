import * as React from 'react';
import DatePicker from 'react-native-date-picker';

import moment from 'moment';

import type { SpaceKeys } from '@app/themes';

import { InputBtn } from '../input.btn';

type Props = {
  disabled?: boolean;
  hasErrors?: boolean;
  maxDate?: Date;
  minDate?: Date;
  onChange?: (value: Props['value']) => void;
  placeholder?: string;
  size?: SpaceKeys;
  value?: moment.MomentInput;
  withFeedback?: boolean;
};

export const DatePickerCompactBtn: React.FC<Props> = ({
  disabled,
  hasErrors,
  maxDate,
  minDate,
  onChange,
  placeholder,
  size,
  value,
}) => {
  const [modalVisible, setModalVisible] = React.useState(false);

  const handleClose = () => {
    setModalVisible(false);
  };

  const handleConfirm = (date: Props['value']) => {
    onChange?.(date);
    handleClose();
  };

  return (
    <>
      <InputBtn
        disabled={disabled}
        hasError={hasErrors}
        onPress={() => setModalVisible(true)}
        placeholder={placeholder}
        size={size}
        value={value ? moment(value).format('L') : undefined}
        withFeedback
      />
      <DatePicker
        androidVariant="iosClone"
        date={moment(value ?? moment().subtract(18, 'years')).toDate()}
        maximumDate={maxDate}
        minimumDate={minDate}
        modal
        mode="date"
        onCancel={handleClose}
        onConfirm={handleConfirm}
        open={modalVisible}
        theme="light"
      />
    </>
  );
};
