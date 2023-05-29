import type { PlaceType, TravelerType } from '@app/generated/server.gql';

export type Place = {
  iata: string;
  type: PlaceType;
};

export type FlightSearchSlice = {
  origin: Place;
  destination: Place;
  departureDate: string;
};

export type FlightSearchTraveler = {
  type: TravelerType;
};
