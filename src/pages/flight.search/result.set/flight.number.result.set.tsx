import { FaIcon } from '@app/components/icons.fontawesome';
import { useKeyboardSubmitEvent } from '@app/components/input/use.keyboard.submit';
import { ListItem } from '@app/components/list.item';
import { vibrate } from '@app/lib/haptic.feedback';
import { useTheme } from '@app/lib/hooks/use.theme';
import * as React from 'react';
import { ScrollView, TouchableOpacity } from 'react-native';
import { Publisher } from '../publisher';
import { State } from '../state';
import { useFocusedInput } from '../state/use.focused.input';
import { useValue } from '../state/use.value';

export const FlightNumberResultSet: React.FC = () => {
  const flightNumber = useValue('flightNumber')!;
  const textSearch = useValue('textSearch');
  const focused = useFocusedInput();
  const value = textSearch || flightNumber;
  const theme = useTheme();

  const handleSelection = React.useCallback(() => {
    vibrate('impactMedium');
    State.actions.setState({
      textSearch: undefined,
      flightNumber: value,
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
          padding="small"
          style={[{ backgroundColor: theme.pallette.grey[100] }]}
          title={value}
          description="Flight Number"
          icon={<FaIcon name="hashtag" light size={20} />}
          extra={
            <FaIcon
              light
              name="arrow-right-long"
              color={theme.pallette.active}
            />
          }
        />
      </TouchableOpacity>
    </ScrollView>
  );
};
