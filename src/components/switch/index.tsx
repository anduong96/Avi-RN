import * as React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export type Props = {
  onChange?: (value: Props['value']) => void;
  options: Array<{ label: string; value: string }>;
  value?: string;
};

export const SwitchButton: React.FC<Props> = ({ onChange, options, value }) => {
  return (
    <View style={[styles.container]}>
      {options.map((opt) => {
        const isActive = opt.value === value;
        return (
          <TouchableOpacity
            activeOpacity={1}
            key={opt.value}
            onPress={() => !isActive && onChange?.(opt.value)}
            style={[styles.item, isActive && styles.activeItem]}
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
  activeItem: {
    backgroundColor: '#555555',
  },
  activeItemText: {
    color: '#fff',
  },
  container: {
    borderRadius: 4,
    display: 'flex',
    flexDirection: 'row',
    overflow: 'hidden',
  },
  item: {
    backgroundColor: '#EEEEEF',
    display: 'flex',
    flexBasis: 1,
    flexDirection: 'row',
    flexGrow: 1,
    justifyContent: 'center',
    padding: 5,
  },
  itemText: {
    color: '#000',
  },
});
