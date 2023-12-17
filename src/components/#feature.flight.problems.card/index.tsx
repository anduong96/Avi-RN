import * as React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { Pressable, StyleSheet, View } from 'react-native';
import Animated, { StretchInY, StretchOutY } from 'react-native-reanimated';

import tinycolor from 'tinycolor2';
import { kebabCase } from 'lodash';
import { firebase } from '@react-native-firebase/messaging';

import { withStyled } from '@app/lib/styled';
import { vibrate } from '@app/lib/haptic.feedback';
import { useUser } from '@app/state/user/use.user';
import { useTheme } from '@app/lib/hooks/use.theme';
import { MarketingPageSlug } from '@app/pages/[marketing]/constants';
import { useRootNavigation } from '@app/navigation/use.root.navigation';

import { Group } from '../group';
import { Shadow } from '../shadow';
import { Button } from '../button';
import { Typography } from '../typography';
import { useFeature } from './use.feature';
import { useToast } from '../toast/use.toast';

export const FeatureFlightProblems: React.FC = () => {
  const featureName = 'Flight Problems';
  const theme = useTheme();
  const navigation = useRootNavigation();
  const user = useUser();
  const feature = useFeature(featureName);
  const toast = useToast();
  const textColor = theme.pallette.white;

  async function handleAdd() {
    vibrate('effectClick');
    if (user.isAnonymous) {
      return toast({
        description: 'Please sign in to add to waitlist.',
        preset: 'warning',
        title: 'Sign in required!',
      });
    }

    try {
      const topic = `wait-list-${kebabCase(featureName.toLowerCase())}`;
      await firebase.messaging().subscribeToTopic(topic);
      await feature.add();
      toast({
        description: 'We will get back to you soon!',
        preset: 'success',
        title: "You're in!",
      });
    } catch (error) {
      toast({
        description: (error as Error).message,
        preset: 'error',
        title: 'Error!',
      });
    }
  }

  if (feature.isActive) {
    return null;
  }

  return (
    <Animated.View entering={StretchInY.delay(700)} exiting={StretchOutY}>
      <Shadow color={theme.pallette.primary} level={2}>
        <Container>
          <LinearGradient
            colors={[
              tinycolor(theme.pallette.primary).complement().toRgbString(),
              theme.pallette.secondary,
              theme.pallette.primary,
            ]}
            end={{ x: 0.5, y: 1.0 }}
            start={{ x: 0.0, y: 0.25 }}
            style={StyleSheet.absoluteFillObject}
          />
          <Group gap={'large'} padding={'large'}>
            <Group gap={'small'}>
              <Typography color={textColor} isBoldest isCentered type="h1">
                Flight problems?
              </Typography>
              <Typography isCentered type="massive">
                💸 🎉
              </Typography>
            </Group>
            <Group gap={'small'} isCentered>
              <Button
                color={textColor}
                fullWidth
                isLoading={feature.isAdding}
                onPress={handleAdd}
                textStyle={{ color: textColor }}
              >
                Join waitlist
              </Button>
              <Pressable
                onPress={() =>
                  navigation.push('Marketing', {
                    slug: MarketingPageSlug.FLIGHT_PROBLEMS,
                  })
                }
              >
                <Group style={{ paddingTop: theme.space.medium }}>
                  <Typography color={textColor} isBold isCentered type="small">
                    Learn more
                  </Typography>
                </Group>
              </Pressable>
            </Group>
          </Group>
        </Container>
      </Shadow>
    </Animated.View>
  );
};

const Container = withStyled(View, (theme) => ({
  borderRadius: theme.borderRadius,
  overflow: 'hidden',
}));
