import * as React from 'react';

import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export type Props = {
  value?: string;
  options: Array<{ value: string; label: string }>;
  onChange?: (value: Props['value']) => void;
};

export const SwitchButton: React.FC<Props> = ({ value, options, onChange }) => {
  return (
    <View style={[styles.container]}>
      {options.map((opt) => {
        const isActive = opt.value === value;
        return (
          <TouchableOpacity
            activeOpacity={1}
            style={[styles.item, isActive && styles.activeItem]}
            key={opt.value}
            onPress={() => !isActive && onChange?.(opt.value)}
          >
            <Text style={[isActive ? styles.activeItemText : styles.itemText]}>
              {opt.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    borderRadius: 4,
    overflow: 'hidden',
  },
  item: {
    flexGrow: 1,
    flexBasis: 1,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 5,
    backgroundColor: '#EEEEEF',
  },
  activeItem: {
    backgroundColor: '#555555',
  },
  itemText: {
    color: '#000',
  },
  activeItemText: {
    color: '#fff',
  },
});
