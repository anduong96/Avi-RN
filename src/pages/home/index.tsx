import * as React from 'react';

import BottomSheet from '@gorhom/bottom-sheet';
import { PageContainer } from '@app/components/page.container';
import { Text } from 'react-native';

export const HomePage: React.FC = () => {
  return (
    <PageContainer centered>
      <Text>Home</Text>
    </PageContainer>
  );
};
