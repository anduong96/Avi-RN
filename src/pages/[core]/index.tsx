import type { RouteProp } from '@react-navigation/native';

import * as React from 'react';
import { Dimensions } from 'react-native';

import moment from 'moment';
import { useRoute } from '@react-navigation/native';

import type { MainStackParams } from '@app/navigation';

import { Markdown } from '@app/components/markdown';
import { useTheme } from '@app/lib/hooks/use.theme';
import { Typography } from '@app/components/typography';
import { useExitPage } from '@app/lib/hooks/use.exit.page';
import { ModalHeader } from '@app/components/modal.header';
import { useCoreContentQuery } from '@app/generated/cms.gql';
import { CmsServerApolloClient } from '@app/apollo/cms.server';
import { PageContainer } from '@app/components/page.container';
import { LoadingOverlay } from '@app/components/loading.overlay';

export const CorePage: React.FC = () => {
  const exit = useExitPage();
  const theme = useTheme();
  const route = useRoute<RouteProp<MainStackParams, 'Core'>>();
  const { data, loading } = useCoreContentQuery({
    client: CmsServerApolloClient,
    variables: {
      slug: route.params.slug,
    },
  });

  return (
    <PageContainer centered>
      <LoadingOverlay isLoading={loading} type="solid" />
      <ModalHeader
        onClose={() => exit()}
        subtitle={
          <Typography color="secondary" type="small">
            {moment(data?.core?.publishedAt).format('ll')}
          </Typography>
        }
        title={data?.core?.title ?? 'Loading ...'}
        withClose
      />
      {data?.core && (
        <Markdown
          flatListProps={{
            contentContainerStyle: {
              backgroundColor: theme.pallette.background,
              overflow: 'hidden',
              padding: theme.space.medium,
              paddingBottom: Dimensions.get('window').height * 0.5,
              paddingHorizontal: theme.space.small,
              width: Dimensions.get('screen').width,
            },
            scrollsToTop: true,
            showsVerticalScrollIndicator: false,
          }}
          value={data.core.content.markdown}
        />
      )}
    </PageContainer>
  );
};
