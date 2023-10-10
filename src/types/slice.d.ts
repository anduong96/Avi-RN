import type { PlaceType, TravelerType } from '@app/generated/server.gql';

export type Place = {
  iata: string;
  type: PlaceType;
};

export type FlightSearchSlice = {
  departureDate: string;
  destination: Place;
  origin: Place;
};

export type FlightSearchTraveler = {
  type: TravelerType;
};
