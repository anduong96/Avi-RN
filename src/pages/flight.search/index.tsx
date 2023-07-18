import * as React from 'react';

import { FlightSearchForm } from './form';
import type { FlightSearchStackParams } from '@app/stacks/flight.search.stack';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { NextBtn } from './next.btn';
import { PageContainer } from '@app/components/page.container';
import { PageHeader } from '@app/components/page.header';
import { PortalHost } from '@gorhom/portal';
import { View } from 'react-native';
import { flightSearchState } from './state';
import { styled } from '@app/lib/styled';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '@app/lib/hooks/use.theme';
import { vibrate } from '@app/lib/haptic.feedback';

type Navigation = NativeStackNavigationProp<FlightSearchStackParams, 'Search'>;

export const FlightSearchPage: React.FC = () => {
  const navigation = useNavigation<Navigation>();
  const theme = useTheme();

  const handleGoBack = () => {
    vibrate('impactMedium');
    navigation.goBack();
    flightSearchState.actions.resetState();
  };

  return (
    <PageContainer style={[{ backgroundColor: theme.pallette.grey[50] }]}>
      <PageHeader
        withBack
        onPressBack={handleGoBack}
        rightActions={
          <Actions>
            <NextBtn />
          </Actions>
        }
      />
      <Content>
        <FlightSearchForm />
      </Content>
      <PortalHost name="FlightSearch" />
    </PageContainer>
  );
};

const Content = styled(View, (theme) => [
  {
    flexGrow: 1,
    padding: theme.space.medium,
  },
]);

const Actions = styled(View, (theme) => [
  {
    paddingHorizontal: theme.space.medium,
  },
]);
