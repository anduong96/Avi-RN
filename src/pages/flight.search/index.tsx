import * as React from 'react';

import { FlightSearchForm } from './form';
import type { FlightSearchStackParams } from '@app/stacks/flight.search.stack';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { PageContainer } from '@app/components/page.container';
import { PageHeader } from '@app/components/page.header';
import { Sheet } from './sheet';
import { View } from 'react-native';
import { styled } from '@app/lib/styled';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '@app/lib/hooks/use.theme';
import { vibrate } from '@app/lib/haptic.feedback';

type Navigation = NativeStackNavigationProp<FlightSearchStackParams, 'Search'>;

const sheetHeight = 400;
export const FlightSearchPage: React.FC = () => {
  const navigation = useNavigation<Navigation>();
  const theme = useTheme();

  const handleGoBack = () => {
    vibrate('impactMedium');
    navigation.goBack();
  };

  return (
    <PageContainer style={[{ backgroundColor: theme.pallette.grey[50] }]}>
      <PageHeader withBack onPressBack={handleGoBack} />
      <Content>
        <FlightSearchForm />
      </Content>
      <Sheet height={sheetHeight} />
    </PageContainer>
  );
};

const Content = styled(View, (theme) => [
  {
    flexGrow: 1,
    padding: theme.space.medium,
    paddingBottom: sheetHeight + theme.insets.bottom + theme.space.medium,
  },
]);
