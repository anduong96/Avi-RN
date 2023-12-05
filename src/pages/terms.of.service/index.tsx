import * as React from 'react';
import { ActivityIndicator } from 'react-native';

import moment from 'moment';
import { WINDOW_HEIGHT } from '@gorhom/bottom-sheet';

import { Markdown } from '@app/components/markdown';
import { useTheme } from '@app/lib/hooks/use.theme';
import { ModalHeader } from '@app/components/modal.header';
import { CmsServerApolloClient } from '@app/apollo/cms.server';
import { PageContainer } from '@app/components/page.container';
import { useTermsAndConditionsQuery } from '@app/generated/cms.gql';

export const TermsOfServicePage: React.FC = () => {
  const theme = useTheme();
  const terms = useTermsAndConditionsQuery({
    client: CmsServerApolloClient,
  });

  if (!terms.data?.legal) {
    return (
      <PageContainer centered>
        <ActivityIndicator size="large" />
      </PageContainer>
    );
  }

  return (
    <PageContainer centered>
      <ModalHeader
        subtitle={moment(terms.data.legal.publishedAt).format('ll')}
        title={terms.data.legal.title}
      />
      <Markdown
        flatListProps={{
          contentContainerStyle: {
            backgroundColor: theme.pallette.background,
            padding: theme.space.medium,
            paddingBottom: WINDOW_HEIGHT * 0.5,
            paddingHorizontal: theme.space.small,
          },
          scrollsToTop: true,
        }}
        value={terms.data.legal.content.markdown}
      />
    </PageContainer>
  );
};
