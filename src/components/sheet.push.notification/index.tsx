import * as React from 'react';
import { Text, View } from 'react-native';
import Animated from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import tinycolor from 'tinycolor2';
import messaging from '@react-native-firebase/messaging';
import { BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet';

import { delay } from '@app/lib/delay';
import { withStyled } from '@app/lib/styled';
import { Shake } from '@app/lib/animated/shake';
import { GlobalState } from '@app/state/global';
import { WINDOW_HEIGHT } from '@app/lib/platform';
import { vibrate } from '@app/lib/haptic.feedback';
import { useTheme } from '@app/lib/hooks/use.theme';
import { useAppActive } from '@app/lib/hooks/use.app.state';
import { useUserHasFlightsQuery } from '@app/generated/server.gql';

import { Button } from '../button';
import { ListItem } from '../list.item';
import { BlurredSheetBackdrop } from '../sheet.backdrop.blurred';

export const PushNotificationSheet: React.FC = () => {
  const insets = useSafeAreaInsets();
  const theme = useTheme();
  const sheet = React.useRef<BottomSheetModal>(null);
  const isPushAsked = GlobalState.useSelect((s) => s.isPushAsked);
  const status = GlobalState.useSelect((s) => s.pushPermission);
  const userFlights = useUserHasFlightsQuery();
  const hasFlights = userFlights.data?.userHasFlights ?? false;
  const isActive = useAppActive();
  const [loading, setLoading] = React.useState(false);

  const snapPoints = React.useMemo(
    () => [Math.min(WINDOW_HEIGHT - insets.top, 500)],
    [insets],
  );

  const showSheet = React.useCallback(() => {
    if (isActive && hasFlights && !isPushAsked) {
      delay(3 * 1000).then(() => {
        sheet.current?.present();
      });
    } else {
      sheet.current?.dismiss();
    }
  }, [isActive, hasFlights, isPushAsked]);

  React.useEffect(() => {
    showSheet();
  }, [showSheet]);

  React.useEffect(() => {
    if (status !== messaging.AuthorizationStatus.NOT_DETERMINED) {
      sheet.current?.close();
    }
  }, [status]);

  const handleEnable = async () => {
    GlobalState.actions.setIsPushAsked();

    vibrate('effectClick');
    setLoading(true);
    const responseStatus = await messaging().requestPermission({
      alert: true,
      announcement: true,
      carPlay: true,
      sound: true,
    });
    setLoading(false);
    GlobalState.actions.setState({
      pushPermission: responseStatus,
    });
  };

  const handleDismiss = () => {
    GlobalState.actions.setIsPushAsked();
    sheet.current?.dismiss();
  };

  return (
    <BottomSheetModal
      backdropComponent={BlurredSheetBackdrop}
      backgroundStyle={{ backgroundColor: theme.pallette.background }}
      containerStyle={[isPushAsked && { opacity: 0 }]}
      handleIndicatorStyle={{ display: 'none' }}
      ref={sheet}
      snapPoints={snapPoints}
    >
      <Container>
        <Header>
          <Title>Notifications</Title>
        </Header>
        <Content>
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
        </Content>
        <Footer>
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
          <DismissBtn disabled={loading} isBold isSolid onPress={handleDismiss}>
            not now
          </DismissBtn>
        </Footer>
      </Container>
    </BottomSheetModal>
  );
};

const Container = withStyled(BottomSheetView, (theme) => [
  {
    flexGrow: 1,
    gap: theme.space.large,
    padding: theme.space.medium,
    paddingBottom: theme.insets.bottom,
  },
]);

const Header = withStyled(View, (theme) => [theme.presets.centered]);

const Content = withStyled(View, (theme) => [
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

const EnableBtn = withStyled(Button, (theme) => [
  theme.presets.shadows[100],
  {
    shadowColor: tinycolor(theme.pallette.primary).darken(30).toHexString(),
    shadowOpacity: 1,
  },
]);

const DismissBtn = withStyled(Button, (theme) => [
  {
    backgroundColor: theme.pallette.transparent,
  },
]);

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
