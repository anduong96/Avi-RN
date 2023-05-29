import * as React from 'react';

import { CountryList } from '../country.list';
import { InputBtn } from '../input.btn';
import { Modal } from '../modal';
import { View } from 'react-native';
import { useCountryQuery } from '@app/generated/server.gql';

type Props = {
  isDisabled?: boolean;
  value?: string;
  onChange?: (value: Props['value']) => void;
  placeholder?: string;
  hasErrors?: boolean;
  withFeedback?: boolean;
};

export const CountrySelect: React.FC<Props> = ({
  value,
  onChange,
  placeholder,
  hasErrors,
  isDisabled,
  withFeedback,
}) => {
  const [modalVisible, setModalVisible] = React.useState(false);
  const active = useCountryQuery({
    skip: !value,
    variables: {
      isoCode: value!,
    },
  });
  const country = active.data?.country;
  const handleSelect = (isoCode: string) => {
    onChange?.(isoCode);
    setModalVisible(false);
  };

  return (
    <>
      <View>
        <InputBtn
          placeholder={placeholder}
          hasError={hasErrors}
          onPress={() => setModalVisible(true)}
          value={country?.name}
          disabled={isDisabled}
          withFeedback={withFeedback}
        />
      </View>
      <Modal
        title="Select Country"
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
      >
        <CountryList
          value={value}
          type="isoCode"
          onSelect={(selection) => handleSelect(selection.isoCode)}
        />
      </Modal>
    </>
  );
};
