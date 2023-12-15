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
      <TouchableOpacity onPress={() => setShowEnv((current) => !current)}>
        <ListItem icon={<FaIcon name="dev" />} title="Show ENV" />
        <Modal
          onClose={() => setShowEnv(false)}
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
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() =>
          getFcmToken().then((token) => logger.debug('fcm token=%s', token))
        }
      >
        <ListItem icon={<FaIcon name="dev" />} title="Get FCM Token"></ListItem>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() =>
          getAuthToken().then((token) => logger.debug('token=%s', token))
        }
      >
        <ListItem
          icon={<FaIcon name="dev" />}
          title="Get Auth Token"
        ></ListItem>
      </TouchableOpacity>
    </Card>
  );
};
