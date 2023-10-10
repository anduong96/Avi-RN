import * as React from 'react';
import { ActivityIndicator, ScrollView } from 'react-native';

import moment from 'moment';

import { styled } from '@app/lib/styled';
import { Markdown } from '@app/components/markdown';
import { ModalHeader } from '@app/components/modal.header';
import { CmsServerApolloClient } from '@app/apollo/cms.server';
import { PageContainer } from '@app/components/page.container';
import { SpaceVertical } from '@app/components/space.vertical';
import { useTermsAndConditionsQuery } from '@app/generated/cms.gql';

export const TermsOfServicePage: React.FC = () => {
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
      <Content>
        <Markdown value={terms.data.legal.content.markdown} />
        <SpaceVertical height={200} />
      </Content>
    </PageContainer>
  );
};

const Content = styled(ScrollView, (theme) => ({
  padding: theme.space.medium,
  paddingTop: 0,
}));
