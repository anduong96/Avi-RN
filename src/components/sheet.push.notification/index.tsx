import * as React from 'react';

import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native';
import { BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet';

import { BlurredSheetBackdrop } from '../sheet.backdrop.blurred';
import { FaIcon } from '../icons.fontawesome';
import { GlobalState } from '@app/state/global';
import { WINDOW_HEIGHT } from '@app/lib/platform';
import { delay } from '@app/lib/delay';
import messaging from '@react-native-firebase/messaging';
import { styled } from '@app/lib/styled';
import { useAppState } from '@app/lib/hooks/use.app.state';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '@app/lib/hooks/use.theme';
import { useUserHasFlightsQuery } from '@app/generated/server.gql';
import { vibrate } from '@app/lib/haptic.feedback';

export const PushNotificationSheet: React.FC = () => {
  const iconSize = 45;
  const insets = useSafeAreaInsets();
  const theme = useTheme();
  const sheet = React.useRef<BottomSheetModal>(null);
  const isPushAsked = GlobalState.useSelect((s) => s.isPushAsked);
  const status = GlobalState.useSelect((s) => s.pushPermission);
  const userFlights = useUserHasFlightsQuery();
  const hasFlights = userFlights.data?.userHasFlights;
  const appState = useAppState();
  const [loading, setLoading] = React.useState(false);

  const snapPoints = React.useMemo(
    () => [Math.min(WINDOW_HEIGHT - insets.top, 500)],
    [insets],
  );

  const showSheet = React.useCallback(() => {
    if (appState === 'active' && hasFlights && !isPushAsked) {
      delay(3 * 1000).then(() => {
        sheet.current?.present();
      });
    }
  }, [appState, hasFlights, isPushAsked]);

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

    vibrate('impactMedium');
    setLoading(true);
    const responseStatus = await messaging().requestPermission({
      announcement: true,
      sound: true,
      alert: true,
      carPlay: true,
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
      ref={sheet}
      backdropComponent={BlurredSheetBackdrop}
      snapPoints={snapPoints}
      handleIndicatorStyle={{ display: 'none' }}
      containerStyle={[isPushAsked && { opacity: 0 }]}
    >
      <Container>
        <Header>
          <Title>Flight Alerts</Title>
        </Header>
        <Content>
          <Section>
            <SectionIcon>
              <FaIcon
                type="fa"
                name="bell"
                size={iconSize}
                color={theme.pallette.active}
              />
            </SectionIcon>
            <SectionMeta>
              <SectionTitle>Flight activities</SectionTitle>
              <SectionDesc>
                Important information about your flights such as delay
              </SectionDesc>
            </SectionMeta>
          </Section>
          <Section>
            <SectionIcon>
              <FaIcon
                type="fa"
                name="bolt"
                size={iconSize}
                color={theme.pallette.warnLight}
              />
            </SectionIcon>
            <SectionMeta>
              <SectionTitle>Lightning Fast</SectionTitle>
              <SectionDesc>
                Instantaneous alert at the moment it happens
              </SectionDesc>
            </SectionMeta>
          </Section>
        </Content>
        <Footer>
          <EnableBtn onPress={handleEnable} disabled={loading}>
            {loading ? (
              <ActivityIndicator color={theme.pallette.white} />
            ) : (
              <EnableBtnText>Enable</EnableBtnText>
            )}
          </EnableBtn>
          <DismissBtn onPress={handleDismiss} disabled={loading}>
            <DismissBtnText>not now</DismissBtnText>
          </DismissBtn>
        </Footer>
      </Container>
    </BottomSheetModal>
  );
};

const Container = styled(BottomSheetView, (theme) => [
  {
    padding: theme.space.medium,
    gap: theme.space.large,
    paddingBottom: theme.insets.bottom,
    flexGrow: 1,
  },
]);

const Header = styled(View, (theme) => [theme.presets.centered]);

const Content = styled(View, (theme) => [
  theme.presets.centered,
  {
    gap: theme.space.medium,
    flexGrow: 1,
  },
]);

const Footer = styled(View, (theme) => [
  theme.presets.centered,
  {
    gap: theme.space.medium,
  },
]);

const Title = styled(Text, (theme) => [theme.typography.presets.h1]);

const EnableBtn = styled(TouchableOpacity, (theme) => [
  theme.presets.shadows[100],
  theme.presets.centered,
  {
    minWidth: 150,
    shadowOpacity: 0.3,
    flexDirection: 'row',
    paddingVertical: 20,
    paddingHorizontal: 40,
    gap: theme.space.small,
    backgroundColor: theme.pallette.black,
    borderRadius: 100,
  },
]);

const EnableBtnText = styled(Text, (theme) => [
  theme.typography.presets.p1,
  {
    color: theme.pallette.white,
    fontWeight: 'bold',
  },
]);

const DismissBtn = styled(TouchableOpacity, (theme) => [
  {
    paddingBottom: theme.space.small,
  },
]);

const DismissBtnText = styled(Text, (theme) => [
  theme.typography.presets.p1,
  {
    color: theme.typography.color,
    fontWeight: 'bold',
  },
]);

const Section = styled(View, (theme) => [
  {
    flexDirection: 'row',
    gap: theme.space.small,
  },
]);

const SectionMeta = styled(View, (theme) => [
  {
    flexGrow: 1,
    flexShrink: 1,
    overflow: 'hidden',
    gap: theme.space.tiny,
  },
]);

const SectionIcon = styled(View, () => [
  {
    alignItems: 'center',
    justifyContent: 'center',
    width: 75,
    height: undefined,
    aspectRatio: 1,
  },
]);

const SectionTitle = styled(Text, (theme) => [
  theme.typography.presets.p1,
  {
    fontWeight: 'bold',
  },
]);

const SectionDesc = styled(Text, (theme) => [
  theme.typography.presets.p1,
  {
    flexShrink: 1,
  },
]);
