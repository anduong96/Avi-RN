import type { RouteProp } from '@react-navigation/native';

import * as React from 'react';
import { Dimensions, View } from 'react-native';

import { useRoute } from '@react-navigation/native';

import type { MainStackParams } from '@app/navigation';

import { withStyled } from '@app/lib/styled';
import { Group } from '@app/components/group';
import { Markdown } from '@app/components/markdown';
import { useTheme } from '@app/lib/hooks/use.theme';
import { CloseBtn } from '@app/components/btn.close';
import { Typography } from '@app/components/typography';
import { useExitPage } from '@app/lib/hooks/use.exit.page';
import { CmsServerApolloClient } from '@app/apollo/cms.server';
import { PageContainer } from '@app/components/page.container';
import { LoadingOverlay } from '@app/components/loading.overlay';
import { useMarketingContentQuery } from '@app/generated/cms.gql';

export const MarketingPage: React.FC = () => {
  const exit = useExitPage();
  const theme = useTheme();
  const route = useRoute<RouteProp<MainStackParams, 'Core'>>();
  const { data, loading } = useMarketingContentQuery({
    client: CmsServerApolloClient,
    fetchPolicy: 'network-only',
    variables: {
      slug: route.params.slug,
    },
  });

  return (
    <PageContainer centered>
      <LoadingOverlay isLoading={loading} type="solid" />
      <Group paddingHorizontal={'medium'}>
        <Group paddingVertical={'small'}>
          <Group paddingHorizontal={'medium'}>
            <Typography isBold isCentered type="h1">
              {data?.marketing?.title}
            </Typography>
          </Group>
          <Close>
            <CloseBtn onPress={() => exit()} />
          </Close>
        </Group>
        {data?.marketing && (
          <Markdown
            flatListProps={{
              contentContainerStyle: {
                backgroundColor: theme.pallette.background,
                paddingBottom: Dimensions.get('window').height * 0.5,
                paddingTop: theme.space.large,
              },
              scrollsToTop: true,
              showsVerticalScrollIndicator: false,
            }}
            value={data.marketing.content.markdown}
          />
        )}
      </Group>
    </PageContainer>
  );
};

const Close = withStyled(View, () => [
  {
    position: 'absolute',
    right: 0,
    top: 0,
  },
]);
