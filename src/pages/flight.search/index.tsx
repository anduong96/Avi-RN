import * as React from 'react';
import { View } from 'react-native';

import { withStyled } from '@app/lib/styled';
import { CloseBtn } from '@app/components/btn.close';
import { PageHeader } from '@app/components/page.header';
import { PageContainer } from '@app/components/page.container';

import { InputBar } from './input.bar';
import { ResultSet } from './result.set';
import { useFlightSearchState } from './state';

export const FlightSearchPage: React.FC = () => {
  React.useEffect(() => {
    useFlightSearchState.getState().reset();
  }, []);

  return (
    <PageContainer>
      <PageHeader
        rightActions={<CloseBtn />}
        title="Flight Search"
        withoutInsets
      />
      <Content>
        <InputBar />
        <ResultContainer>
          <ResultSet />
        </ResultContainer>
      </Content>
    </PageContainer>
  );
};

const Content = withStyled(View, (theme) => [
  {
    flexGrow: 1,
    gap: theme.space.large,
  },
]);

const ResultContainer = withStyled(View, () => [
  {
    flexGrow: 1,
  },
]);
