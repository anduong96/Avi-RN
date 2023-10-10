import * as React from 'react';

import { CloseBtn } from '@app/components/btn.close';
import { PageHeader } from '@app/components/page.header';
import { PageContainer } from '@app/components/page.container';

export const SettingsPage: React.FC = () => {
  return (
    <PageContainer>
      <PageHeader rightActions={<CloseBtn />} title="Settings" withoutInsets />
    </PageContainer>
  );
};
