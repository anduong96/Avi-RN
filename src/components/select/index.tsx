import * as React from 'react';
import { View } from 'react-native';
import { FullWindowOverlay } from 'react-native-screens';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { Pressable, StyleSheet, Text, TouchableOpacity } from 'react-native';

import { Portal } from '@gorhom/portal';
import { BlurView } from '@react-native-community/blur';

import { withStyled } from '@app/lib/styled';
import { vibrate } from '@app/lib/haptic.feedback';
import { useTheme } from '@app/lib/hooks/use.theme';

import { ListItem } from '../list.item';
import { LoadingOverlay } from '../loading.overlay';
import { HorizontalDivider } from '../divider.horizontal';

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
      <Portal>
        <FullWindowOverlay>
          {showOptions && (
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
                          title={option.label}
                          titleStyle={[
                            value === option.value && {
                              color: theme.pallette.active,
                              fontWeight: 'bold',
                            },
                          ]}
                          verticalPadding="small"
                        />
                      </OptionItem>
                    </TouchableOpacity>
                  ))}
                </Options>
              </Content>
            </Animated.View>
          )}
        </FullWindowOverlay>
      </Portal>
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

const Options = withStyled(View, () => [
  {
    flexGrow: 1,
  },
]);

const OptionItem = withStyled(View, (theme) => [
  {
    justifyContent: 'center',
    paddingVertical: theme.space.tiny,
  },
]);

const Content = withStyled(View, (theme) => [
  {
    backgroundColor: theme.pallette.background,
    borderRadius: theme.borderRadius,
    bottom: 0,
    left: 0,
    margin: theme.space.medium,
    marginBottom: theme.insets.bottom || theme.space.medium,
    position: 'absolute',
    right: 0,
  },
]);
