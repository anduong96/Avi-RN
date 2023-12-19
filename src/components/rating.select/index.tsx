import * as React from 'react';
import { TouchableOpacity } from 'react-native';

import { logger } from '@app/lib/logger';
import { vibrate } from '@app/lib/haptic.feedback';
import { useTheme } from '@app/lib/hooks/use.theme';

import { Card } from '../card';
import { List } from '../list';
import { Group } from '../group';
import { Typography } from '../typography';

type Props = {
  hasErrors?: boolean;
  onChange?: (value: number) => void;
  value?: number;
};

export const RatingSelect: React.FC<Props> = ({
  hasErrors,
  onChange,
  value,
}) => {
  const theme = useTheme();
  function handleSelect(nextValue: number) {
    if (onChange) {
      vibrate('effectClick');
      logger.debug('Rating changed to %s', nextValue);
      onChange(nextValue);
    }
  }

  return (
    <Card
      style={[
        hasErrors && {
          borderColor: theme.pallette.danger,
          borderWidth: theme.borderWidth,
        },
      ]}
    >
      <Group padding={'medium'}>
        <List
          data={['😡', '😕', '🙂', '😄', '😍']}
          horizontal
          renderItem={(item, index) => {
            return (
              <TouchableOpacity
                onPress={() => handleSelect(index)}
                style={[
                  index !== value && {
                    opacity: 0.2,
                  },
                ]}
              >
                <Typography type="h0">{item}</Typography>
              </TouchableOpacity>
            );
          }}
          style={{
            justifyContent: 'space-between',
          }}
        />
      </Group>
    </Card>
  );
};
