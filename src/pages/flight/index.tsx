import * as React from 'react';

import type { FlightStackParams } from '@app/stacks/flight.stack';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { PageContainer } from '@app/components/page.container';
import { PageHeader } from '@app/components/page.header';
import { useNavigation } from '@react-navigation/native';
import { vibrate } from '@app/lib/haptic.feedback';

type Navigation = NativeStackNavigationProp<FlightStackParams, 'Flight'>;

export const FlightPage: React.FC = () => {
  const navigation = useNavigation<Navigation>();

  const handleClose = () => {
    vibrate('impactMedium');
    navigation.goBack();
  };

  return (
    <PageContainer>
      <PageHeader withBack onPressBack={handleClose} />
    </PageContainer>
  );
};
