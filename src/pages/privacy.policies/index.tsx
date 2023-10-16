import * as React from 'react';
import { ActivityIndicator } from 'react-native';

import moment from 'moment';
import { WINDOW_HEIGHT } from '@gorhom/bottom-sheet';

import { Markdown } from '@app/components/markdown';
import { useTheme } from '@app/lib/hooks/use.theme';
import { ModalHeader } from '@app/components/modal.header';
import { CmsServerApolloClient } from '@app/apollo/cms.server';
import { PageContainer } from '@app/components/page.container';
import { usePrivacyPolicyQuery } from '@app/generated/cms.gql';

export const PrivacyPoliciesPage: React.FC = () => {
  const theme = useTheme();
  const privacy = usePrivacyPolicyQuery({
    client: CmsServerApolloClient,
  });

  if (!privacy.data?.legal) {
    return (
      <PageContainer centered>
        <ActivityIndicator size="large" />
      </PageContainer>
    );
  }

  return (
    <PageContainer centered>
      <ModalHeader
        subtitle={moment(privacy.data.legal.publishedAt).format('ll')}
        title={privacy.data.legal.title}
      />
      <Markdown
        flatListProps={{
          contentContainerStyle: {
            backgroundColor: theme.pallette.background,
            paddingBottom: WINDOW_HEIGHT * 0.5,
            paddingHorizontal: theme.space.medium,
          },
          scrollsToTop: true,
        }}
        value={privacy.data.legal.content.markdown}
      />
    </PageContainer>
  );
};
