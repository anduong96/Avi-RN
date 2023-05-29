import * as React from 'react';

import Animated, {
  SlideInDown,
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
} from 'react-native-reanimated';
import { Btn, ModalBg, OptionItem, OptionItemText, Options } from './styles';
import type { StyleProp, ViewStyle } from 'react-native';

import { HorizontalDivider } from '../divider.horizontal';
import { List } from '../list';
import { MaterialIcon } from '../icons.material';
import { Modal } from 'react-native';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';
import { RotateUpsidedown } from './animation';
import { useTheme } from '@app/lib/hooks/use.theme';

type Option = {
  icon?: string | React.ReactElement;
  title: string;
  subtitle?: string;
  onPress?: () => void;
  closeOnPress?: boolean;
  disabled?: boolean;
};

type Props = {
  position?: 'bottomLeft' | 'bottomRight';
  style?: StyleProp<ViewStyle>;
  btnColor?: string;
  iconColor?: string;
  options: Option[];
};

export const FloatingMenuButton: React.FC<Props> = ({
  position = 'bottomRight',
  options,
  style,
  btnColor,
  iconColor,
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
          <MaterialIcon
            size={45}
            name="menu-up"
            color={iconColor || theme.pallette.white}
          />
        </Animated.View>
      </Btn>
      <Modal animationType="fade" transparent visible={isOpen}>
        <ModalBg onTouchStart={() => setIsOpen(false)} />
        <Options entering={SlideInDown} blurType="xlight">
          <List
            data={options}
            separator={() => (
              <HorizontalDivider color={theme.pallette.grey[400]} />
            )}
            renderItem={(item) => (
              <OptionItem
                disabled={item.disabled}
                activeOpacity={item.disabled ? 1 : 0.5}
                onPress={() => handleItemPress(item)}
              >
                <OptionItemText disabled={item.disabled}>
                  {item.title}
                </OptionItemText>
              </OptionItem>
            )}
          />
        </Options>
        <Btn
          onPress={() => setIsOpen(false)}
          position={position}
          style={[{ backgroundColor: btnColor || theme.pallette.primary }]}
        >
          <Animated.View entering={RotateUpsidedown}>
            <MaterialIcon
              size={45}
              name="menu-up"
              color={iconColor || theme.pallette.white}
            />
          </Animated.View>
        </Btn>
      </Modal>
    </>
  );
};
