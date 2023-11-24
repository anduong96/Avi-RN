import type { SharedValue } from 'react-native-reanimated';

import * as React from 'react';
import { TouchableOpacity, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';

import { WINDOW_HEIGHT } from '@gorhom/bottom-sheet';

import { List } from '@app/components/list';
import { withStyled } from '@app/lib/styled';
import { Group } from '@app/components/group';
import { useTheme } from '@app/lib/hooks/use.theme';
import { FaIcon } from '@app/components/icons.fontawesome';
import { DividerDashed } from '@app/components/divider.dashed';
import { BlurredBackground } from '@app/components/blurred/background';

import type { FlightSectionEnum } from './constants';

import { FlightSection } from './constants';
import { useSectionColor } from './hooks/use.section.color';

type Props = {
  onScrollY: (translationY: number) => void;
  onSectionPress: (section: FlightSectionEnum) => void;
  scrollY: SharedValue<number>;
};

export const ProgressBar: React.FC<Props> = ({
  onScrollY,
  onSectionPress,
  scrollY,
}) => {
  const theme = useTheme();
  const opacity = useSharedValue(0);
  const getIconColor = useSectionColor();
  const scrollTopStyle = useAnimatedStyle(() => ({
    opacity: withTiming(scrollY.value > WINDOW_HEIGHT * 0.3 ? 1 : 0, {
      duration: 300,
    }),
  }));

  React.useEffect(() => {
    opacity.value = withDelay(
      1000,
      withTiming(1, {
        duration: 300,
      }),
    );
  }, [opacity]);

  return (
    <Container style={{ opacity }}>
      <Animated.View style={scrollTopStyle}>
        <Item
          onPressIn={() => onScrollY(0)}
          style={[theme.presets.centered, { overflow: 'hidden' }]}
        >
          <BlurredBackground />
          <FaIcon
            color={theme.pallette.text}
            name="arrow-up-to-line"
            size={15}
          />
        </Item>
      </Animated.View>
      <Group overflow="hidden" style={{ borderRadius: theme.roundRadius }}>
        <BlurredBackground />
        <List
          data={Object.values(FlightSection)}
          keyExtractor={({ icon }) => icon}
          renderItem={({ icon, section }) => (
            <Item onPress={() => onSectionPress(section)}>
              <FaIcon color={getIconColor(section)} name={icon} size={15} />
            </Item>
          )}
          separator={(_, index) => (
            <DividerContainer>
              <Divider dashColor={getIconColor(index)} />
            </DividerContainer>
          )}
        />
      </Group>
    </Container>
  );
};

const Item = withStyled(TouchableOpacity, (theme) => [
  theme.presets.centered,
  {
    aspectRatio: 1,
    borderRadius: theme.roundRadius,
    paddingHorizontal: theme.space.small,
    paddingVertical: theme.space.small + 5,
  },
]);

const Container = withStyled(Animated.View, (theme) => [
  {
    bottom: theme.insets.bottom || theme.space.medium,
    elevation: 1,
    gap: theme.space.tiny,
    position: 'absolute',
    right: theme.insets.right || theme.space.medium,
    zIndex: 1,
  },
]);

const DividerContainer = withStyled(View, () => [
  {
    alignItems: 'center',
    flexGrow: 1,
    height: 30,
  },
]);

const Divider = withStyled(DividerDashed, undefined, {
  dashSize: 5,
  dashThickness: 2,
  isVertical: true,
});
