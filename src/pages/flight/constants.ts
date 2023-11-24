export enum FlightSectionEnum {
  META,
  DEPARTURE,
  IN_FLIGHT,
  ARRIVAL,
}

export const FlightSection = {
  [FlightSectionEnum.ARRIVAL]: {
    icon: 'plane-arrival',
    label: 'Arrival',
    section: FlightSectionEnum.ARRIVAL,
  },
  [FlightSectionEnum.DEPARTURE]: {
    icon: 'plane-departure',
    label: 'Departure',
    section: FlightSectionEnum.DEPARTURE,
  },
  [FlightSectionEnum.IN_FLIGHT]: {
    icon: 'plane-engines',
    label: 'In-Flight',
    section: FlightSectionEnum.IN_FLIGHT,
  },
} as const;
