import * as React from 'react';
import { ScrollView, TouchableOpacity } from 'react-native';

import { vibrate } from '@app/lib/haptic.feedback';
import { useTheme } from '@app/lib/hooks/use.theme';
import { ListItem } from '@app/components/list.item';
import { FaIcon } from '@app/components/icons.fontawesome';
import { useKeyboardSubmitEvent } from '@app/components/input/use.keyboard.submit';

import { State } from '../state';
import { Publisher } from '../publisher';
import { useValue } from '../state/use.value';
import { useFocusedInput } from '../state/use.focused.input';

export const FlightNumberResultSet: React.FC = () => {
  const flightNumber = useValue('flightNumber')!;
  const textSearch = useValue('textSearch');
  const focused = useFocusedInput();
  const value = textSearch || flightNumber;
  const theme = useTheme();

  const handleSelection = React.useCallback(() => {
    vibrate('impactMedium');
    State.actions.setState({
      flightNumber: value,
      textSearch: undefined,
    });

    Publisher.broadcast('Selected', undefined);
  }, [value]);

  useKeyboardSubmitEvent(() => {
    if (focused === 'flightNumber') {
      handleSelection();
    }
  }, [handleSelection, focused]);

  return (
    <ScrollView>
      <TouchableOpacity onPress={() => handleSelection()}>
        <ListItem
          description="Flight Number"
          extra={
            <FaIcon
              color={theme.pallette.active}
              light
              name="arrow-right-long"
              size={20}
            />
          }
          horizontalPadding="medium"
          icon={<FaIcon light name="hashtag" size={20} />}
          style={[{ backgroundColor: theme.pallette.grey[50] }]}
          title={value}
          verticalPadding="medium"
        />
      </TouchableOpacity>
    </ScrollView>
  );
};
