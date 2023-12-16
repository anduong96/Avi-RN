import * as React from 'react';
import { Dimensions, ScrollView, TouchableOpacity } from 'react-native';

import { ENV } from '@app/env';
import { logger } from '@app/lib/logger';
import { Card } from '@app/components/card';
import { List } from '@app/components/list';
import { Modal } from '@app/components/modal';
import { Group } from '@app/components/group';
import { useTheme } from '@app/lib/hooks/use.theme';
import { ListItem } from '@app/components/list.item';
import { getFcmToken } from '@app/lib/get.fcm.token';
import { getAuthToken } from '@app/lib/get.auth.token';
import { Typography } from '@app/components/typography';
import { FaIcon } from '@app/components/icons.fontawesome';
import { SpaceVertical } from '@app/components/space.vertical';
import { HorizontalDivider } from '@app/components/divider.horizontal';

export const DevCard: React.FC = () => {
  const theme = useTheme();
  const [isCollapsed, setCollapsed] = React.useState(false);
  const [showEnv, setShowEnv] = React.useState(false);

  return (
    <Card
      collapsible
      isCollapsed={isCollapsed}
      onCollapseState={() => setCollapsed((current) => !current)}
      padding={'medium'}
      title="Dev"
    >
      <Modal
        onClose={() => setShowEnv(false)}
        style={{ backgroundColor: theme.pallette.background }}
        subtitle={'Environment variables'}
        title={'ENV'}
        visible={showEnv}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          <List
            ListFooterComponent={
              <SpaceVertical size={Dimensions.get('window').height / 3} />
            }
            data={Object.entries(ENV)}
            gap={10}
            renderItem={([key, value], index) => (
              <Group
                gap="tiny"
                key={key + index}
                marginHorizontal={'medium'}
                padding={'medium'}
                style={{
                  backgroundColor: theme.pallette.card,
                  borderRadius: theme.borderRadius,
                }}
              >
                <Typography isBold type="small">
                  {String(key)}
                </Typography>
                <Typography type="h3">{String(value)}</Typography>
              </Group>
            )}
          />
        </ScrollView>
      </Modal>
      <List
        data={[
          {
            onPress: () => setShowEnv((current) => !current),
            title: 'Show ENV',
          },
          {
            onPress: () => logger.debug('fcm token=%s', getFcmToken()),
            title: 'Log FCM Token',
          },
          {
            onPress: () => logger.debug('auth token=%s', getAuthToken()),
            title: 'Log Auth Token',
          },
        ]}
        gap={theme.space.small}
        renderItem={(item) => (
          <TouchableOpacity onPress={item.onPress}>
            <ListItem icon={<FaIcon name="dev" />} title={item.title} />
          </TouchableOpacity>
        )}
        separator={() => <HorizontalDivider />}
      />
    </Card>
  );
};
