import * as React from 'react';

import { Text, TouchableOpacity } from 'react-native';

import auth from '@react-native-firebase/auth';
import { useTheme } from '@app/lib/hooks/use.theme';

export const AnonymousSignInBtn: React.FC = () => {
  const theme = useTheme();

  return (
    <TouchableOpacity
      onPress={() => auth().signInAnonymously()}
      style={[theme.presets.centered, { padding: theme.space.small }]}
    >
      <Text
        style={[
          theme.typography.presets.p2,
          { color: theme.typography.secondaryColor },
        ]}
      >
        Continue as guest
      </Text>
    </TouchableOpacity>
  );
};
