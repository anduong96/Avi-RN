import { useTheme } from '@app/lib/hooks/use.theme';
import { FlightStatus } from '@app/generated/server.gql';

import { useFlight } from '../context';
import { FlightSectionEnum } from '../constants';

export function useSectionColor() {
  const theme = useTheme();
  const flight = useFlight();

  return (section: FlightSectionEnum) => {
    if (flight.status === FlightStatus.SCHEDULED) {
      if (section === FlightSectionEnum.DEPARTURE) {
        return theme.pallette.active;
      }
    } else if (flight.status === FlightStatus.DEPARTED) {
      if (
        section === FlightSectionEnum.IN_FLIGHT ||
        section === FlightSectionEnum.DEPARTURE
      ) {
        return theme.pallette.active;
      }
    } else if (
      flight.status === FlightStatus.LANDED ||
      flight.status === FlightStatus.ARRIVED ||
      flight.status === FlightStatus.ARCHIVED
    ) {
      return theme.pallette.active;
    }

    return theme.pallette.grey[400];
  };
}
