import * as React from 'react';

import { CloseBtn } from '@app/components/btn.close';
import { PageContainer } from '@app/components/page.container';
import { PageHeader } from '@app/components/page.header';
import { useGoBack } from '@app/lib/hooks/use.go.back';
import { styled } from '@app/lib/styled';
import type { MainStack } from '@app/stacks';
import { useNavigation } from '@react-navigation/native';
import { View } from 'react-native';
import { InputBar } from './input.bar';
import { ResultSet } from './result.set';
import { State } from './state';

export const FlightSearchPage: React.FC = () => {
  const navigation = useNavigation<MainStack<'FlightSearch'>>();
  const handleClose = useGoBack(navigation);

  React.useEffect(() => {
    State.actions.reset();
  }, []);

  return (
    <PageContainer>
      <PageHeader
        withoutInsets
        title="Flight Search"
        rightActions={<CloseBtn onPress={handleClose} />}
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

const Content = styled(View, (theme) => [
  {
    gap: theme.space.large,
    flexGrow: 1,
  },
]);

const ResultContainer = styled(View, () => [
  {
    flexGrow: 1,
  },
]);
