import * as React from 'react';
import { Text, View } from 'react-native';
import Animated from 'react-native-reanimated';

import messaging from '@react-native-firebase/messaging';
import { AuthorizationStatus } from '@notifee/react-native';
import { BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet';

import { delay } from '@app/lib/delay';
import { logger } from '@app/lib/logger';
import { format } from '@app/lib/format';
import { withStyled } from '@app/lib/styled';
import { Shake } from '@app/lib/animated/shake';
import { vibrate } from '@app/lib/haptic.feedback';
import { useGlobalState } from '@app/state/global';
import { useTheme } from '@app/lib/hooks/use.theme';
import { useAppActive } from '@app/lib/hooks/use.app.state';
import { useUserHasFlightsQuery } from '@app/generated/server.gql';

import { Button } from '../button';
import { Shadow } from '../shadow';
import { ListItem } from '../list.item';
import { usePrompt } from '../prompt/use.prompt';
import { SpaceVertical } from '../space.vertical';
import { BlurredSheetBackdrop } from '../sheet.backdrop.blurred';

export const PushNotificationSheet: React.FC = () => {
  const sheet = React.useRef<BottomSheetModal>(null);
  const prompt = usePrompt();
  const theme = useTheme();
  const hasPushAsked = useGlobalState((s) => s._hasPushAsked);
  const status = useGlobalState((s) => s.pushPermission);
  const userFlights = useUserHasFlightsQuery();
  const hasFlights = userFlights.data?.userHasFlights ?? false;
  const isActive = useAppActive();
  const [loading, setLoading] = React.useState(false);
  const snapPoints = React.useMemo(() => ['100%'], []);

  const showSheet = React.useCallback(() => {
    if (
      isActive &&
      hasFlights &&
      status === messaging.AuthorizationStatus.NOT_DETERMINED
    ) {
      logger.debug('Showing push notification sheet');
      delay(3 * 1000).then(() => {
        sheet.current?.present();
      });
    } else {
      sheet.current?.dismiss();
    }
  }, [isActive, hasFlights, status]);

  React.useEffect(() => {
    showSheet();
  }, [showSheet]);

  React.useEffect(() => {
    logger.debug(
      format(
        'Push notification status statusCode=%s options=%o',
        status,
        messaging.AuthorizationStatus,
      ),
    );

    if (status !== messaging.AuthorizationStatus.NOT_DETERMINED) {
      sheet.current?.close();
    }
  }, [status]);

  const handleEnable = async () => {
    vibrate('effectClick');
    setLoading(true);
    logger.debug('User selected to enable push notifications');
    logger.debug('Requesting push notification permission');
    try {
      const responseStatus = await messaging().requestPermission({
        alert: true,
        announcement: true,
        carPlay: true,
        sound: true,
      });
      logger.debug(format('Set Push permission statusCode=%s', responseStatus));
      useGlobalState.setState({
        _hasPushAsked: true,
        pushPermission: responseStatus,
      });
    } catch (error) {
      logger.error('Error requesting push notification permission', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDismiss = () => {
    prompt({
      description: 'Push notifications are core functionality of the app',
      onAccept: () => {
        useGlobalState.setState({
          _hasPushAsked: true,
          pushPermission: AuthorizationStatus.NOT_DETERMINED,
        });

        sheet.current?.dismiss();
      },
      title: 'Are you sure?',
    });
  };

  return (
    <BottomSheetModal
      backdropComponent={BlurredSheetBackdrop}
      backgroundStyle={{ backgroundColor: 'transparent' }}
      containerStyle={[hasPushAsked && { opacity: 0 }]}
      detached
      handleIndicatorStyle={{ display: 'none' }}
      ref={sheet}
      snapPoints={snapPoints}
    >
      <Container>
        <Content>
          <Header>
            <Title>Notifications</Title>
          </Header>
          <Body>
            <Item
              description="Important information about your flights such as delay"
              icon={
                <Animated.View entering={Shake()}>
                  <Icon>🔔</Icon>
                </Animated.View>
              }
              title="Flight Activities"
            />
            <Item
              description="Instantaneous alert at the moment it happens"
              icon={<Icon>⚡</Icon>}
              title="Lightning Fast"
            />
          </Body>
          <SpaceVertical size="small" />
          <Footer>
            <Shadow
              color={theme.pallette.primary}
              darken={30}
              level={2}
              style={{ borderRadius: theme.roundRadius }}
            >
              <EnableBtn
                isBold
                isLoading={loading}
                isSolid
                onPress={handleEnable}
                size="large"
                type="primary"
              >
                Enable
              </EnableBtn>
            </Shadow>
            <DismissBtn
              disabled={loading}
              isBold
              isSolid
              onPress={handleDismiss}
            >
              not now
            </DismissBtn>
          </Footer>
        </Content>
      </Container>
    </BottomSheetModal>
  );
};

const Container = withStyled(BottomSheetView, (theme) => [
  {
    flexGrow: 1,
    justifyContent: 'flex-end',
    paddingBottom: theme.insets.bottom || theme.space.large,
    paddingHorizontal: theme.space.medium,
    paddingTop: theme.insets.top || theme.space.medium,
  },
]);

const Content = withStyled(View, (theme) => [
  {
    backgroundColor: theme.pallette.background,
    borderRadius: theme.borderRadius,
    gap: theme.space.large,
    padding: theme.space.large,
    paddingBottom: theme.insets.bottom || theme.space.large,
  },
]);

const Header = withStyled(View, (theme) => [theme.presets.centered]);

const Body = withStyled(View, (theme) => [
  theme.presets.centered,
  {
    flexGrow: 1,
    gap: theme.space.medium,
  },
]);

const Footer = withStyled(View, (theme) => [
  theme.presets.centered,
  {
    gap: theme.space.medium,
  },
]);

const Title = withStyled(Text, (theme) => [theme.typography.presets.h1]);

const EnableBtn = withStyled(Button);

const DismissBtn = withStyled(
  Button,
  (theme) => [
    {
      backgroundColor: theme.pallette.transparent,
    },
  ],
  (theme) => ({
    textStyle: {
      color: theme.pallette.danger,
    },
  }),
);

const Item = withStyled(
  ListItem,
  () => [
    {
      flexWrap: 'wrap',
      justifyContent: 'flex-start',
      paddingHorizontal: 0,
      paddingVertical: 0,
      width: '100%',
    },
  ],
  (theme) => [
    {
      titleStyle: [theme.typography.presets.h3],
    },
  ],
);

const Icon = withStyled(Text, (theme) => [
  theme.typography.presets.h1,
  {
    textAlign: 'center',
  },
]);
