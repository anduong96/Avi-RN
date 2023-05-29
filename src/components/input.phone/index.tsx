import * as React from 'react';

import { Container, Country, CountryCode, StyledInput } from './styles';

import { CheckIcon } from '../icon.check';
import { CountryList } from '../country.list';
import { Modal } from '../modal';
import { VerticalDivider } from '../divider.vertical';
import { View } from 'react-native';
import { parsePhone } from './parse.phone';
import { useTheme } from '@app/lib/hooks/use.theme';

type Props = {
  autoFocus?: boolean;
  hasErrors?: boolean;
  disabled?: boolean;
  value?: string;
  onChange?: (value: Props['value']) => void;
  fallbackDialCode?: string;
  withFeedback?: boolean;
};

export const InputPhone: React.FC<Props> = ({
  disabled,
  value,
  autoFocus,
  onChange,
  hasErrors,
  withFeedback,
}) => {
  const theme = useTheme();
  const [showCountries, setShowCountries] = React.useState(false);
  const [selectedDialCode, setSelectedDialCode] = React.useState<string>('');

  const phone = value?.substring(selectedDialCode.length, value.length) || '';

  const handleChange = (nextValue: string) => {
    const combinedValue = selectedDialCode + nextValue;

    onChange?.(combinedValue || selectedDialCode);
  };

  const handleCountrySelect = (dialCode: string) => {
    setShowCountries(false);
    setSelectedDialCode(dialCode);
    onChange?.(dialCode + phone);
  };

  React.useEffect(() => {
    if (!selectedDialCode && value) {
      setSelectedDialCode('+' + parsePhone(value).countryCode);
    } else if (!value) {
      setSelectedDialCode('+1');
    }
  }, [value, selectedDialCode]);

  return (
    <>
      <Container hasErrors={hasErrors} disabled={disabled}>
        <Country onPress={() => setShowCountries(true)}>
          <CountryCode>{selectedDialCode}</CountryCode>
        </Country>
        <VerticalDivider />
        <StyledInput
          autoFocus={autoFocus}
          autoCapitalize="none"
          autoCorrect={false}
          value={phone}
          editable={!disabled}
          autoComplete="tel-country-code"
          keyboardType="phone-pad"
          onChangeText={handleChange}
        />
        {withFeedback && value && !hasErrors && (
          <View style={{ paddingHorizontal: theme.space.medium }}>
            <CheckIcon />
          </View>
        )}
      </Container>
      <Modal
        withCloseBtn
        title="Select Country"
        visible={showCountries}
        onClose={() => setShowCountries(false)}
      >
        <CountryList
          value={selectedDialCode}
          type="dialCode"
          onSelect={(country) => handleCountrySelect(country.dialCode)}
        />
      </Modal>
    </>
  );
};
