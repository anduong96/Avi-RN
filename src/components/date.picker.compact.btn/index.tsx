import * as React from 'react';

import DatePicker from 'react-native-date-picker';
import { InputBtn } from '../input.btn';
import type { SpaceKeys } from '@app/themes';
import moment from 'moment';

type Props = {
  value?: moment.MomentInput;
  onChange?: (value: Props['value']) => void;
  placeholder?: string;
  hasErrors?: boolean;
  minDate?: Date;
  maxDate?: Date;
  size?: SpaceKeys;
  withFeedback?: boolean;
  disabled?: boolean;
};

export const DatePickerCompactBtn: React.FC<Props> = ({
  value,
  hasErrors,
  onChange,
  placeholder,
  minDate,
  maxDate,
  size,
  disabled,
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
        size={size}
        placeholder={placeholder}
        value={value ? moment(value).format('L') : undefined}
        onPress={() => setModalVisible(true)}
        hasError={hasErrors}
        withFeedback
        disabled={disabled}
      />
      <DatePicker
        modal
        theme="light"
        androidVariant="iosClone"
        mode="date"
        maximumDate={maxDate}
        minimumDate={minDate}
        date={moment(value ?? moment().subtract(18, 'years')).toDate()}
        open={modalVisible}
        onCancel={handleClose}
        onConfirm={handleConfirm}
      />
    </>
  );
};
