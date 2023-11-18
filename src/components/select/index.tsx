import * as React from 'react';
import { View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { Pressable, StyleSheet, Text, TouchableOpacity } from 'react-native';

import { Portal } from '@gorhom/portal';
import { BlurView } from '@react-native-community/blur';

import { withStyled } from '@app/lib/styled';
import { vibrate } from '@app/lib/haptic.feedback';
import { useTheme } from '@app/lib/hooks/use.theme';

import { ListItem } from '../list.item';
import { CloseBtn } from '../btn.close';
import { LoadingOverlay } from '../loading.overlay';
import { HorizontalDivider } from '../divider.horizontal';
import { PortalWindowOverlay } from '../portal.window.overlay';

type Props<T> = {
  description?: string;
  isLoading?: boolean;
  onChange?: (value: T) => void;
  options: Array<{
    disabled?: boolean;
    icon?: React.ReactElement;
    label: string;
    value: T;
  }>;
  placeholder?: string;
  title?: string;
  value?: T;
};

export const Select = <T extends number | string>({
  isLoading,
  onChange,
  options,
  placeholder = 'Select',
  value,
}: Props<T>) => {
  const theme = useTheme();
  const [showOptions, setShowOptions] = React.useState(false);
  const display = options.find((option) => option.value === value);
  const displayLabel = display?.label || value;

  const handleSelect = (nextValue: T) => {
    if (onChange) {
      vibrate('effectClick');
      onChange(nextValue);
    }

    setShowOptions(false);
  };

  return (
    <>
      <TouchableOpacity onPress={() => setShowOptions(true)}>
        <LoadingOverlay isLoading={isLoading} size={'small'} />
        <Label isPlaceholder={!Boolean(displayLabel)}>
          {displayLabel || placeholder}
        </Label>
      </TouchableOpacity>
      {showOptions && (
        <Portal>
          <PortalWindowOverlay>
            <Animated.View
              entering={FadeInDown}
              style={StyleSheet.absoluteFill}
            >
              <Pressable
                onPress={() => setShowOptions(false)}
                style={StyleSheet.absoluteFill}
              >
                <BlurView blurType="dark" style={StyleSheet.absoluteFill} />
              </Pressable>
              <Content>
                <CloseBtn
                  isAbsolute
                  onPress={() => setShowOptions(false)}
                  size={30}
                  style={{ right: 0, top: -(30 + theme.space.small) }}
                />
                <Options>
                  {options.map((option, index) => (
                    <TouchableOpacity
                      disabled={option.disabled}
                      key={index}
                      onPress={() => handleSelect(option.value)}
                    >
                      <OptionItem>
                        {index > 0 && <HorizontalDivider />}
                        <ListItem
                          horizontalPadding="large"
                          icon={option.icon}
                          key={option.value}
                          style={{ backgroundColor: theme.pallette.background }}
                          title={option.label}
                          titleStyle={[
                            value === option.value && {
                              color: theme.pallette.active,
                              fontWeight: 'bold',
                            },
                          ]}
                          verticalPadding="medium"
                        />
                      </OptionItem>
                    </TouchableOpacity>
                  ))}
                </Options>
              </Content>
            </Animated.View>
          </PortalWindowOverlay>
        </Portal>
      )}
    </>
  );
};

const Label = withStyled<{ isPlaceholder?: boolean }, typeof Text>(
  Text,
  (theme, props) => [
    theme.typography.presets.p1,
    {
      color: theme.pallette.active,
      fontWeight: 'bold',
    },
    props.isPlaceholder && {
      color: theme.pallette.grey[300],
    },
  ],
);

const Options = withStyled(View, (theme) => [
  {
    borderRadius: theme.borderRadius,
    flexGrow: 1,
    overflow: 'hidden',
  },
]);

const OptionItem = withStyled(View, () => [
  {
    justifyContent: 'center',
  },
]);

const Content = withStyled(View, (theme) => [
  {
    bottom: 0,
    left: 0,
    margin: theme.space.medium,
    marginBottom: theme.insets.bottom || theme.space.medium,
    position: 'absolute',
    right: 0,
  },
]);
