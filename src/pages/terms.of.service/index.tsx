import * as React from 'react';

import { ActivityIndicator } from 'react-native';
import { CmsServerApolloClient } from '@app/apollo/cms.server';
import { Content } from './styles';
import { Markdown } from '@app/components/markdown';
import { ModalHeader } from '@app/components/modal.header';
import { PageContainer } from '@app/components/page.container';
import { SpaceVertical } from '@app/components/space.vertical';
import moment from 'moment';
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
        title={terms.data.legal.title}
        subtitle={moment(terms.data.legal.publishedAt).format('ll')}
      />
      <Content>
        <Markdown value={terms.data.legal.content.markdown} />
        <SpaceVertical height={200} />
      </Content>
    </PageContainer>
  );
};
