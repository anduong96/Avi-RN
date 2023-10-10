import * as React from 'react';
import { ActivityIndicator, ScrollView } from 'react-native';

import moment from 'moment';

import { styled } from '@app/lib/styled';
import { Markdown } from '@app/components/markdown';
import { ModalHeader } from '@app/components/modal.header';
import { CmsServerApolloClient } from '@app/apollo/cms.server';
import { PageContainer } from '@app/components/page.container';
import { SpaceVertical } from '@app/components/space.vertical';
import { usePrivacyPolicyQuery } from '@app/generated/cms.gql';

export const PrivacyPoliciesPage: React.FC = () => {
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
      <Content>
        <Markdown value={privacy.data.legal.content.markdown} />
        <SpaceVertical height={200} />
      </Content>
    </PageContainer>
  );
};

const Content = styled(ScrollView, (theme) => ({
  padding: theme.space.medium,
  paddingTop: 0,
}));
