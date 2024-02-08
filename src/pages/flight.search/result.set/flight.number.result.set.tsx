import * as React from 'react';
import { ScrollView, TouchableOpacity } from 'react-native';

import { vibrate } from '@app/lib/haptic.feedback';
import { useTheme } from '@app/lib/hooks/use.theme';
import { ListItem } from '@app/components/list.item';
import { FaIcon } from '@app/components/icons.fontawesome';
import { useKeyboardSubmitEvent } from '@app/components/input/use.keyboard.submit';

import { Publisher } from '../publisher';
import { useFlightSearchState } from '../state';

export const FlightNumberResultSet: React.FC = () => {
  const flightNumber = useFlightSearchState((s) => s.flightNumber)!;
  const textSearch = useFlightSearchState((s) => s.textSearch);
  const focused = useFlightSearchState((s) => s.focusInput);
  const value = textSearch || flightNumber;
  const theme = useTheme();

  const handleSelection = React.useCallback(() => {
    vibrate('impactMedium');
    useFlightSearchState.setState({
      flightNumber: value,
      focusInput: undefined,
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
          style={[
            {
              backgroundColor: theme.pallette.grey[50],
              borderRadius: theme.borderRadius,
            },
          ]}
          title={value}
          verticalPadding="medium"
        />
      </TouchableOpacity>
    </ScrollView>
  );
};
