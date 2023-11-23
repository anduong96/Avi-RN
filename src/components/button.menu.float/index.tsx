import * as React from 'react';
import { Modal, Text, TouchableOpacity, View } from 'react-native';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';
import Animated, {
  SlideInDown,
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
} from 'react-native-reanimated';

import type { StyleProp, ViewStyle } from 'react-native';

import { withStyled } from '@app/lib/styled';
import { useTheme } from '@app/lib/hooks/use.theme';

import { List } from '../list';
import { FaIcon } from '../icons.fontawesome';
import { BlurredView } from '../blurred/view';
import { RotateUpsideDown } from './animation';
import { HorizontalDivider } from '../divider.horizontal';
type Option = {
  closeOnPress?: boolean;
  disabled?: boolean;
  icon?: React.ReactElement | string;
  onPress?: () => void;
  subtitle?: string;
  title: string;
};

type Props = {
  btnColor?: string;
  iconColor?: string;
  options: Option[];
  position?: 'bottomLeft' | 'bottomRight';
  style?: StyleProp<ViewStyle>;
};

export const FloatingMenuButton: React.FC<Props> = ({
  btnColor,
  iconColor,
  options,
  position = 'bottomRight',
  style,
}) => {
  const theme = useTheme();
  const [isOpen, setIsOpen] = React.useState(false);
  const isOpenDerived = useDerivedValue(() => isOpen, [isOpen]);
  const iconStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          rotate: withTiming(isOpenDerived.value ? '180deg' : '0deg', {
            duration: 400,
          }),
        },
      ],
    };
  });

  const handleOpen = () => {
    ReactNativeHapticFeedback.trigger('impactMedium');
    setIsOpen(true);
  };

  const handleItemPress = (option: Option) => {
    ReactNativeHapticFeedback.trigger('impactMedium');
    option.onPress?.();
    if (option.closeOnPress) {
      setIsOpen(false);
    }
  };

  return (
    <>
      <Btn
        onPress={handleOpen}
        position={position}
        style={[{ backgroundColor: btnColor || theme.pallette.primary }, style]}
      >
        <Animated.View style={[iconStyle]}>
          <FaIcon
            color={iconColor || theme.pallette.white}
            name="menu-up"
            size={45}
          />
        </Animated.View>
      </Btn>
      <Modal animationType="fade" transparent visible={isOpen}>
        <ModalBg onTouchStart={() => setIsOpen(false)} />
        <Options blurType="xlight" entering={SlideInDown}>
          <List
            data={options}
            renderItem={(item) => (
              <OptionItem
                activeOpacity={item.disabled ? 1 : 0.5}
                disabled={item.disabled}
                onPress={() => handleItemPress(item)}
              >
                <OptionItemText disabled={item.disabled}>
                  {item.title}
                </OptionItemText>
              </OptionItem>
            )}
            separator={() => (
              <HorizontalDivider color={theme.pallette.grey[400]} />
            )}
          />
        </Options>
        <Btn
          onPress={() => setIsOpen(false)}
          position={position}
          style={[{ backgroundColor: btnColor || theme.pallette.primary }]}
        >
          <Animated.View entering={RotateUpsideDown}>
            <FaIcon
              color={iconColor || theme.pallette.white}
              name="menu-up"
              size={45}
            />
          </Animated.View>
        </Btn>
      </Modal>
    </>
  );
};

const Btn = withStyled<
  { position: 'bottomLeft' | 'bottomRight' },
  typeof TouchableOpacity
>(TouchableOpacity, (theme, props) => [
  theme.presets.centered,
  theme.presets.shadows[100],
  {
    aspectRatio: 1,
    borderRadius: 60,
    position: 'absolute',
    shadowOffset: {
      height: 5,
      width: 5,
    },
    shadowOpacity: 0.4,
    shadowRadius: 3,
    width: 60,
    zIndex: 1,
  },
  props.position === 'bottomLeft' && {
    bottom: theme.insets.bottom,
    left: theme.insets.left + theme.space.medium,
  },
  props.position === 'bottomRight' && {
    bottom: theme.insets.bottom,
    right: theme.insets.right + theme.space.medium,
  },
]);

const ModalBg = withStyled(View, (theme) => [
  {
    backgroundColor: theme.pallette.black,
    bottom: 0,
    left: 0,
    opacity: 0.4,
    position: 'absolute',
    right: 0,
    top: 0,
  },
]);

const Options = withStyled(
  Animated.createAnimatedComponent(BlurredView),
  (theme) => [
    {
      borderRadius: theme.borderRadius,
      bottom: theme.insets.bottom + theme.space.medium + 60,
      position: 'absolute',
      right: theme.space.medium,
    },
  ],
);

const OptionItem = withStyled(TouchableOpacity, (theme) => [
  {
    padding: theme.space.medium,
  },
]);

const OptionItemText = withStyled<{ disabled?: boolean }, typeof Text>(
  Text,
  (theme) => [
    theme.typography.presets.p1,
    {
      color: theme.pallette.text,
      textAlign: 'left',
    },
  ],
);
