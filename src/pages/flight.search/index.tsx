import * as React from 'react';

import { PageContainer } from '@app/components/page.container';
import { PageHeader } from '@app/components/page.header';
import { useTheme } from '@app/lib/hooks/use.theme';
import { styled } from '@app/lib/styled';
import { PortalHost } from '@gorhom/portal';
import { View } from 'react-native';
import { FlightSearchForm } from './form';
import { NextBtn } from './next.btn';
import { flightSearchState } from './state';

export const FlightSearchPage: React.FC = () => {
  const theme = useTheme();

  React.useEffect(() => {
    return () => {
      flightSearchState.actions.resetState();
    };
  }, []);

  return (
    <PageContainer style={[{ backgroundColor: theme.pallette.grey[50] }]}>
      <PageHeader
        withoutInsets
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
