import type { Flight } from '@app/generated/server.gql';

import { FlightStatus } from '@app/generated/server.gql';

import { FlightSectionEnum } from '../constants';

export function getIsSectionAutoCollapsed(
  section: FlightSectionEnum,
  flight: Pick<Flight, 'status'>,
) {
  if (section === FlightSectionEnum.DEPARTURE) {
    return flight.status === FlightStatus.DEPARTED;
  } else if (section === FlightSectionEnum.IN_FLIGHT) {
    return flight.status === FlightStatus.LANDED;
  } else if (section === FlightSectionEnum.ARRIVAL) {
    return flight.status === FlightStatus.ARCHIVED;
  }
}
