import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTimeISO: { input: any; output: any; }
  JSON: { input: any; output: any; }
};

export type Aircraft = {
  __typename?: 'Aircraft';
  AircraftPositions: Array<AircraftPosition>;
  airlineIata: Scalars['String']['output'];
  createdAt: Scalars['DateTimeISO']['output'];
  description?: Maybe<Scalars['String']['output']>;
  firstFlight?: Maybe<Scalars['DateTimeISO']['output']>;
  iata?: Maybe<Scalars['String']['output']>;
  icao: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  imageURL?: Maybe<Scalars['String']['output']>;
  model: Scalars['String']['output'];
  tailNumber: Scalars['String']['output'];
  updatedAt: Scalars['DateTimeISO']['output'];
};

export type AircraftPosition = {
  __typename?: 'AircraftPosition';
  aircraftID: Scalars['Int']['output'];
  airlineIata: Scalars['String']['output'];
  altitude?: Maybe<Scalars['Float']['output']>;
  createdAt: Scalars['DateTimeISO']['output'];
  destinationIata: Scalars['String']['output'];
  flightDate: Scalars['Int']['output'];
  flightMonth: Scalars['Int']['output'];
  flightNumber: Scalars['String']['output'];
  flightYear: Scalars['Int']['output'];
  id: Scalars['Int']['output'];
  latitude?: Maybe<Scalars['Float']['output']>;
  longitude?: Maybe<Scalars['Float']['output']>;
  originIata: Scalars['String']['output'];
  updatedAt: Scalars['DateTimeISO']['output'];
};

export type Airline = {
  __typename?: 'Airline';
  Flight: Array<Flight>;
  iata: Scalars['String']['output'];
  icao?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  isLowCost?: Maybe<Scalars['Boolean']['output']>;
  logoCompactImageType?: Maybe<ImageType>;
  logoCompactImageURL?: Maybe<Scalars['String']['output']>;
  logoFullImageType?: Maybe<ImageType>;
  logoFullImageURL?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
};

export type Airport = {
  __typename?: 'Airport';
  Country: Country;
  cityCode: Scalars['String']['output'];
  cityName: Scalars['String']['output'];
  countryCode: Scalars['String']['output'];
  countyName?: Maybe<Scalars['String']['output']>;
  elevation?: Maybe<Scalars['Int']['output']>;
  iata?: Maybe<Scalars['String']['output']>;
  icao?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  latitude: Scalars['Float']['output'];
  longitude: Scalars['Float']['output'];
  name: Scalars['String']['output'];
  state?: Maybe<Scalars['String']['output']>;
  timezone: Scalars['String']['output'];
};

export type AirportTsaCheckPointHour = {
  __typename?: 'AirportTsaCheckPointHour';
  hour: Scalars['Float']['output'];
  status: CheckPointStatus;
};

export type AirportTsaCheckPointTerminal = {
  __typename?: 'AirportTsaCheckPointTerminal';
  checkpoints: Array<AirportTsaCheckPoints>;
  terminalName: Scalars['String']['output'];
};

export type AirportTsaCheckPoints = {
  __typename?: 'AirportTsaCheckPoints';
  checkPointName: Scalars['String']['output'];
  hours: Array<AirportTsaCheckPointHour>;
};

export type AirportTsaWaitTime = {
  __typename?: 'AirportTsaWaitTime';
  dayOfWeek: Scalars['Float']['output'];
  hour: Scalars['Float']['output'];
  maxWaitMinute: Scalars['Float']['output'];
  updatedAt: Scalars['DateTimeISO']['output'];
};

export type AirportWeather = {
  __typename?: 'AirportWeather';
  airTemperatureCelsius: Scalars['Int']['output'];
  airportIata: Scalars['String']['output'];
  createdAt: Scalars['DateTimeISO']['output'];
  date: Scalars['Int']['output'];
  hour: Scalars['Int']['output'];
  iconURL: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  month: Scalars['Int']['output'];
  precipitationAmountMillimeter: Scalars['Int']['output'];
  status: Scalars['String']['output'];
  updatedAt: Scalars['DateTimeISO']['output'];
  vendor: Scalars['String']['output'];
  windFromDirectionDegrees: Scalars['Int']['output'];
  windSpeedMeterPerSecond: Scalars['Int']['output'];
  year: Scalars['Int']['output'];
};

export const CheckPointStatus = {
  CLOSE: 'CLOSE',
  OPEN: 'OPEN'
} as const;

export type CheckPointStatus = typeof CheckPointStatus[keyof typeof CheckPointStatus];
export type Country = {
  __typename?: 'Country';
  dialCode: Scalars['String']['output'];
  flagImageType?: Maybe<ImageType>;
  flagImageURL?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  isoCode: Scalars['String']['output'];
  name: Scalars['String']['output'];
};

export const DateFormatType = {
  AMERICAN: 'AMERICAN',
  WORLD: 'WORLD'
} as const;

export type DateFormatType = typeof DateFormatType[keyof typeof DateFormatType];
export type Feedback = {
  __typename?: 'Feedback';
  createdAt: Scalars['DateTimeISO']['output'];
  id: Scalars['ID']['output'];
  message: Scalars['String']['output'];
  rating: Scalars['Int']['output'];
  type: FeedbackType;
  updatedAt: Scalars['DateTimeISO']['output'];
  userID: Scalars['String']['output'];
};

export const FeedbackType = {
  APP_ENHANCEMENT: 'APP_ENHANCEMENT',
  BUG_REPORT: 'BUG_REPORT',
  FEATURE_REQUEST: 'FEATURE_REQUEST',
  INQUIRY: 'INQUIRY',
  QUESTION: 'QUESTION'
} as const;

export type FeedbackType = typeof FeedbackType[keyof typeof FeedbackType];
export type Flight = {
  __typename?: 'Flight';
  Airline: Airline;
  Destination: Airport;
  Origin: Airport;
  actualGateArrival?: Maybe<Scalars['DateTimeISO']['output']>;
  actualGateDeparture?: Maybe<Scalars['DateTimeISO']['output']>;
  aircraftTailNumber?: Maybe<Scalars['String']['output']>;
  airlineIata: Scalars['String']['output'];
  co2EmissionKgBusiness?: Maybe<Scalars['Float']['output']>;
  co2EmissionKgEco?: Maybe<Scalars['Float']['output']>;
  co2EmissionKgEconomy?: Maybe<Scalars['Float']['output']>;
  co2EmissionKgFirst?: Maybe<Scalars['Float']['output']>;
  createdAt: Scalars['DateTimeISO']['output'];
  destinationBaggageClaim?: Maybe<Scalars['String']['output']>;
  destinationGate?: Maybe<Scalars['String']['output']>;
  destinationIata: Scalars['String']['output'];
  destinationTerminal?: Maybe<Scalars['String']['output']>;
  destinationUtcHourOffset: Scalars['Int']['output'];
  durationMs: Scalars['Float']['output'];
  estimatedGateArrival: Scalars['DateTimeISO']['output'];
  estimatedGateDeparture: Scalars['DateTimeISO']['output'];
  flightDate: Scalars['Int']['output'];
  flightMonth: Scalars['Int']['output'];
  flightNumber: Scalars['String']['output'];
  flightYear: Scalars['Int']['output'];
  id: Scalars['ID']['output'];
  originGate?: Maybe<Scalars['String']['output']>;
  originIata: Scalars['String']['output'];
  originTerminal?: Maybe<Scalars['String']['output']>;
  originUtcHourOffset: Scalars['Int']['output'];
  progressPercent: Scalars['Float']['output'];
  reconAttempt?: Maybe<Scalars['Int']['output']>;
  remainingDurationMs: Scalars['Float']['output'];
  scheduledGateArrival: Scalars['DateTimeISO']['output'];
  scheduledGateDeparture: Scalars['DateTimeISO']['output'];
  status: FlightStatus;
  totalDistanceKm?: Maybe<Scalars['Int']['output']>;
  updatedAt: Scalars['DateTimeISO']['output'];
};

export type FlightPromptness = {
  __typename?: 'FlightPromptness';
  airlineIata: Scalars['String']['output'];
  averageDelayTimeMs?: Maybe<Scalars['Int']['output']>;
  cancelledCount?: Maybe<Scalars['Int']['output']>;
  createdAt: Scalars['DateTimeISO']['output'];
  daysObserved?: Maybe<Scalars['Int']['output']>;
  destinationIata: Scalars['String']['output'];
  divertedCount?: Maybe<Scalars['Int']['output']>;
  excessiveCount?: Maybe<Scalars['Int']['output']>;
  expiresAt: Scalars['DateTimeISO']['output'];
  flightNumber: Scalars['String']['output'];
  flightsObserved?: Maybe<Scalars['Int']['output']>;
  id: Scalars['ID']['output'];
  lateCount?: Maybe<Scalars['Int']['output']>;
  onTimeCount?: Maybe<Scalars['Int']['output']>;
  onTimePercent?: Maybe<Scalars['Int']['output']>;
  originIata: Scalars['String']['output'];
  rating?: Maybe<Scalars['Int']['output']>;
  updatedAt: Scalars['DateTimeISO']['output'];
  vendor: FlightVendor;
  veryLateCount?: Maybe<Scalars['Int']['output']>;
};

export const FlightStatus = {
  ARCHIVED: 'ARCHIVED',
  ARRIVED: 'ARRIVED',
  CANCELED: 'CANCELED',
  DELAYED: 'DELAYED',
  DEPARTED: 'DEPARTED',
  LANDED: 'LANDED',
  SCHEDULED: 'SCHEDULED'
} as const;

export type FlightStatus = typeof FlightStatus[keyof typeof FlightStatus];
export const FlightVendor = {
  AERO_DATA_BOX: 'AERO_DATA_BOX',
  FLIGHT_STATS: 'FLIGHT_STATS'
} as const;

export type FlightVendor = typeof FlightVendor[keyof typeof FlightVendor];
export const ImageType = {
  PNG: 'PNG',
  SVG: 'SVG'
} as const;

export type ImageType = typeof ImageType[keyof typeof ImageType];
export const MeasurementType = {
  AMERICAN: 'AMERICAN',
  METRIC: 'METRIC'
} as const;

export type MeasurementType = typeof MeasurementType[keyof typeof MeasurementType];
export type Mutation = {
  __typename?: 'Mutation';
  _sendFlightNotification: Scalars['Float']['output'];
  /** Add user to wait list */
  addToWaitList: Scalars['String']['output'];
  addUserFlight: Scalars['String']['output'];
  deleteUser: Scalars['Boolean']['output'];
  deleteUserFlight: Scalars['String']['output'];
  /** Remove user from wait list */
  removeFromWaitList: Scalars['String']['output'];
  submitFeedback: Scalars['String']['output'];
  syncUser: Scalars['Boolean']['output'];
  updateUserPreference: Scalars['Boolean']['output'];
};


export type Mutation_SendFlightNotificationArgs = {
  body: Scalars['String']['input'];
  data?: InputMaybe<Scalars['JSON']['input']>;
  flightID: Scalars['String']['input'];
  title: Scalars['String']['input'];
};


export type MutationAddToWaitListArgs = {
  feature: Scalars['String']['input'];
};


export type MutationAddUserFlightArgs = {
  flightID: Scalars['String']['input'];
};


export type MutationDeleteUserFlightArgs = {
  flightID: Scalars['String']['input'];
};


export type MutationRemoveFromWaitListArgs = {
  feature: Scalars['String']['input'];
};


export type MutationSubmitFeedbackArgs = {
  message: Scalars['String']['input'];
  rating: Scalars['Float']['input'];
  type: FeedbackType;
};


export type MutationUpdateUserPreferenceArgs = {
  data: UpdateUserPreferenceInput;
};

export type Query = {
  __typename?: 'Query';
  aircraft?: Maybe<Aircraft>;
  aircraftPosition?: Maybe<AircraftPosition>;
  airline: Airline;
  airlines: Array<Airline>;
  airport: Airport;
  airportTsaCheckpointsStatus?: Maybe<Array<AirportTsaCheckPointTerminal>>;
  airportTsaWaitTime?: Maybe<Array<AirportTsaWaitTime>>;
  airportWeather: AirportWeather;
  airportWeatherDay: Array<AirportWeather>;
  flight: Flight;
  flightPromptness: FlightPromptness;
  flights: Array<Flight>;
  health: Scalars['String']['output'];
  randomFlight: Flight;
  recentFeedback?: Maybe<Feedback>;
  user: User;
  userActiveFlights: Array<UserFlight>;
  userArchivedFlights: Array<UserFlight>;
  userFlight?: Maybe<UserFlight>;
  userHasFlights: Scalars['Boolean']['output'];
  /** Check if user is in wait list */
  userIsInWaitList: Scalars['Boolean']['output'];
  userPreference: UserPreference;
  /** Get user wait list features */
  userWaitList: Array<Scalars['String']['output']>;
};


export type QueryAircraftArgs = {
  tailNumber: Scalars['String']['input'];
};


export type QueryAircraftPositionArgs = {
  aircraftID: Scalars['Float']['input'];
};


export type QueryAirlineArgs = {
  iata: Scalars['String']['input'];
};


export type QueryAirportArgs = {
  airportIata: Scalars['String']['input'];
};


export type QueryAirportTsaCheckpointsStatusArgs = {
  airportIata: Scalars['String']['input'];
  dayOfWeek: Scalars['Float']['input'];
};


export type QueryAirportTsaWaitTimeArgs = {
  airportIata: Scalars['String']['input'];
};


export type QueryAirportWeatherArgs = {
  airportIata: Scalars['String']['input'];
  date: Scalars['Int']['input'];
  hour: Scalars['Int']['input'];
  month: Scalars['Int']['input'];
  year: Scalars['Int']['input'];
};


export type QueryAirportWeatherDayArgs = {
  airportIata: Scalars['String']['input'];
  date: Scalars['Int']['input'];
  month: Scalars['Int']['input'];
  year: Scalars['Int']['input'];
};


export type QueryFlightArgs = {
  flightID: Scalars['String']['input'];
};


export type QueryFlightPromptnessArgs = {
  flightID: Scalars['String']['input'];
};


export type QueryFlightsArgs = {
  airlineIata: Scalars['String']['input'];
  date: Scalars['Int']['input'];
  flightNumber: Scalars['String']['input'];
  month: Scalars['Int']['input'];
  year: Scalars['Int']['input'];
};


export type QueryUserFlightArgs = {
  flightID: Scalars['String']['input'];
};


export type QueryUserIsInWaitListArgs = {
  feature: Scalars['String']['input'];
};


export type QueryUserWaitListArgs = {
  features: Array<Scalars['String']['input']>;
};

export type UpdateUserPreferenceInput = {
  dateFormat?: InputMaybe<DateFormatType>;
  measurement?: InputMaybe<MeasurementType>;
};

export type User = {
  __typename?: 'User';
  Feedback: Array<Feedback>;
  UserFlight: Array<UserFlight>;
  UserPreference?: Maybe<UserPreference>;
  UserWaitList: Array<UserWaitList>;
  avatarURL?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTimeISO']['output'];
  displayName?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  isAnonymous: Scalars['Boolean']['output'];
  lastSignInAt: Scalars['DateTimeISO']['output'];
  updatedAt: Scalars['DateTimeISO']['output'];
};

export type UserFlight = {
  __typename?: 'UserFlight';
  Flight: Flight;
  createdAt: Scalars['DateTimeISO']['output'];
  flightID: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  shouldAlert: Scalars['Boolean']['output'];
  updatedAt: Scalars['DateTimeISO']['output'];
  userID: Scalars['String']['output'];
};

export type UserPreference = {
  __typename?: 'UserPreference';
  dateFormat: DateFormatType;
  id: Scalars['ID']['output'];
  measurement: MeasurementType;
  userID: Scalars['String']['output'];
};

export type UserWaitList = {
  __typename?: 'UserWaitList';
  createdAt: Scalars['DateTimeISO']['output'];
  feature: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  userID: Scalars['String']['output'];
};

export type AircraftQueryVariables = Exact<{
  tailNumber: Scalars['String']['input'];
}>;


export type AircraftQuery = { __typename?: 'Query', aircraft?: { __typename?: 'Aircraft', id: number, iata?: string | null, icao: string, model: string, airlineIata: string, description?: string | null, tailNumber: string, firstFlight?: any | null, imageURL?: string | null, createdAt: any, updatedAt: any } | null };

export type AircraftPositionQueryVariables = Exact<{
  aircraftID: Scalars['Float']['input'];
}>;


export type AircraftPositionQuery = { __typename?: 'Query', aircraftPosition?: { __typename?: 'AircraftPosition', id: number, aircraftID: number, latitude?: number | null, longitude?: number | null, altitude?: number | null, flightYear: number, flightMonth: number, flightDate: number, flightNumber: string, airlineIata: string, originIata: string, destinationIata: string, createdAt: any, updatedAt: any } | null };

export type AirlinesQueryVariables = Exact<{ [key: string]: never; }>;


export type AirlinesQuery = { __typename?: 'Query', airlines: Array<{ __typename?: 'Airline', id: string, name: string, iata: string, logoCompactImageURL?: string | null, logoCompactImageType?: ImageType | null }> };

export type AirlineQueryVariables = Exact<{
  iata: Scalars['String']['input'];
}>;


export type AirlineQuery = { __typename?: 'Query', airline: { __typename?: 'Airline', id: string, name: string, iata: string, logoCompactImageURL?: string | null, logoCompactImageType?: ImageType | null, logoFullImageURL?: string | null, logoFullImageType?: ImageType | null } };

export type AirportQueryVariables = Exact<{
  airportIata: Scalars['String']['input'];
}>;


export type AirportQuery = { __typename?: 'Query', airport: { __typename?: 'Airport', id: string, name: string, iata?: string | null, cityName: string, cityCode: string, timezone: string, state?: string | null, elevation?: number | null, countryCode: string, countyName?: string | null } };

export type AirportTsaCheckpointsStatusQueryVariables = Exact<{
  dayOfWeek: Scalars['Float']['input'];
  airportIata: Scalars['String']['input'];
}>;


export type AirportTsaCheckpointsStatusQuery = { __typename?: 'Query', airportTsaCheckpointsStatus?: Array<{ __typename?: 'AirportTsaCheckPointTerminal', terminalName: string, checkpoints: Array<{ __typename?: 'AirportTsaCheckPoints', checkPointName: string, hours: Array<{ __typename?: 'AirportTsaCheckPointHour', hour: number, status: CheckPointStatus }> }> }> | null };

export type AirportTsaWaitTimeQueryVariables = Exact<{
  airportIata: Scalars['String']['input'];
}>;


export type AirportTsaWaitTimeQuery = { __typename?: 'Query', airportTsaWaitTime?: Array<{ __typename?: 'AirportTsaWaitTime', dayOfWeek: number, hour: number, maxWaitMinute: number }> | null };

export type AirportWeatherQueryVariables = Exact<{
  hour: Scalars['Int']['input'];
  date: Scalars['Int']['input'];
  month: Scalars['Int']['input'];
  year: Scalars['Int']['input'];
  airportIata: Scalars['String']['input'];
}>;


export type AirportWeatherQuery = { __typename?: 'Query', airportWeather: { __typename?: 'AirportWeather', id: string, airportIata: string, airTemperatureCelsius: number, precipitationAmountMillimeter: number, windSpeedMeterPerSecond: number, windFromDirectionDegrees: number, status: string, iconURL: string } };

export type AirportWeatherDayQueryVariables = Exact<{
  date: Scalars['Int']['input'];
  month: Scalars['Int']['input'];
  year: Scalars['Int']['input'];
  airportIata: Scalars['String']['input'];
}>;


export type AirportWeatherDayQuery = { __typename?: 'Query', airportWeatherDay: Array<{ __typename?: 'AirportWeather', id: string, airportIata: string, airTemperatureCelsius: number, precipitationAmountMillimeter: number, windSpeedMeterPerSecond: number, windFromDirectionDegrees: number, status: string, iconURL: string, date: number, hour: number, month: number, year: number }> };

export type DebugFlightNotificationMutationVariables = Exact<{
  flightID: Scalars['String']['input'];
  title: Scalars['String']['input'];
  body: Scalars['String']['input'];
  data?: InputMaybe<Scalars['JSON']['input']>;
}>;


export type DebugFlightNotificationMutation = { __typename?: 'Mutation', _sendFlightNotification: number };

export type RecentFeedbackQueryVariables = Exact<{ [key: string]: never; }>;


export type RecentFeedbackQuery = { __typename?: 'Query', recentFeedback?: { __typename?: 'Feedback', id: string } | null };

export type SubmitFeedbackMutationVariables = Exact<{
  type: FeedbackType;
  rating: Scalars['Float']['input'];
  message: Scalars['String']['input'];
}>;


export type SubmitFeedbackMutation = { __typename?: 'Mutation', submitFeedback: string };

export type FullFlightFragmentFragment = { __typename?: 'Flight', id: string, airlineIata: string, aircraftTailNumber?: string | null, flightNumber: string, totalDistanceKm?: number | null, durationMs: number, remainingDurationMs: number, progressPercent: number, co2EmissionKgEconomy?: number | null, co2EmissionKgFirst?: number | null, co2EmissionKgBusiness?: number | null, co2EmissionKgEco?: number | null, originIata: string, originTerminal?: string | null, originGate?: string | null, originUtcHourOffset: number, status: FlightStatus, destinationIata: string, destinationGate?: string | null, destinationTerminal?: string | null, destinationBaggageClaim?: string | null, destinationUtcHourOffset: number, scheduledGateDeparture: any, scheduledGateArrival: any, estimatedGateDeparture: any, estimatedGateArrival: any, actualGateDeparture?: any | null, actualGateArrival?: any | null, updatedAt: any, Airline: { __typename?: 'Airline', id: string, name: string, logoCompactImageURL?: string | null }, Origin: { __typename?: 'Airport', id: string, name: string, cityName: string, countryCode: string, cityCode: string, iata?: string | null, timezone: string, latitude: number, longitude: number }, Destination: { __typename?: 'Airport', id: string, name: string, cityName: string, countryCode: string, cityCode: string, iata?: string | null, timezone: string, latitude: number, longitude: number } };

export type FindFlightsQueryVariables = Exact<{
  airlineIata: Scalars['String']['input'];
  flightNumber: Scalars['String']['input'];
  year: Scalars['Int']['input'];
  month: Scalars['Int']['input'];
  date: Scalars['Int']['input'];
}>;


export type FindFlightsQuery = { __typename?: 'Query', flights: Array<{ __typename?: 'Flight', id: string, airlineIata: string, aircraftTailNumber?: string | null, flightNumber: string, totalDistanceKm?: number | null, durationMs: number, remainingDurationMs: number, progressPercent: number, co2EmissionKgEconomy?: number | null, co2EmissionKgFirst?: number | null, co2EmissionKgBusiness?: number | null, co2EmissionKgEco?: number | null, originIata: string, originTerminal?: string | null, originGate?: string | null, originUtcHourOffset: number, status: FlightStatus, destinationIata: string, destinationGate?: string | null, destinationTerminal?: string | null, destinationBaggageClaim?: string | null, destinationUtcHourOffset: number, scheduledGateDeparture: any, scheduledGateArrival: any, estimatedGateDeparture: any, estimatedGateArrival: any, actualGateDeparture?: any | null, actualGateArrival?: any | null, updatedAt: any, Airline: { __typename?: 'Airline', id: string, name: string, logoCompactImageURL?: string | null }, Origin: { __typename?: 'Airport', id: string, name: string, cityName: string, countryCode: string, cityCode: string, iata?: string | null, timezone: string, latitude: number, longitude: number }, Destination: { __typename?: 'Airport', id: string, name: string, cityName: string, countryCode: string, cityCode: string, iata?: string | null, timezone: string, latitude: number, longitude: number } }> };

export type FlightPromptnessQueryVariables = Exact<{
  flightID: Scalars['String']['input'];
}>;


export type FlightPromptnessQuery = { __typename?: 'Query', flightPromptness: { __typename?: 'FlightPromptness', onTimePercent?: number | null, rating?: number | null, averageDelayTimeMs?: number | null } };

export type FlightQueryVariables = Exact<{
  flightID: Scalars['String']['input'];
}>;


export type FlightQuery = { __typename?: 'Query', flight: { __typename?: 'Flight', id: string, airlineIata: string, aircraftTailNumber?: string | null, flightNumber: string, totalDistanceKm?: number | null, durationMs: number, remainingDurationMs: number, progressPercent: number, co2EmissionKgEconomy?: number | null, co2EmissionKgFirst?: number | null, co2EmissionKgBusiness?: number | null, co2EmissionKgEco?: number | null, originIata: string, originTerminal?: string | null, originGate?: string | null, originUtcHourOffset: number, status: FlightStatus, destinationIata: string, destinationGate?: string | null, destinationTerminal?: string | null, destinationBaggageClaim?: string | null, destinationUtcHourOffset: number, scheduledGateDeparture: any, scheduledGateArrival: any, estimatedGateDeparture: any, estimatedGateArrival: any, actualGateDeparture?: any | null, actualGateArrival?: any | null, updatedAt: any, Airline: { __typename?: 'Airline', id: string, name: string, logoCompactImageURL?: string | null }, Origin: { __typename?: 'Airport', id: string, name: string, cityName: string, countryCode: string, cityCode: string, iata?: string | null, timezone: string, latitude: number, longitude: number }, Destination: { __typename?: 'Airport', id: string, name: string, cityName: string, countryCode: string, cityCode: string, iata?: string | null, timezone: string, latitude: number, longitude: number } } };

export type RandomFlightQueryVariables = Exact<{ [key: string]: never; }>;


export type RandomFlightQuery = { __typename?: 'Query', randomFlight: { __typename?: 'Flight', id: string, airlineIata: string, aircraftTailNumber?: string | null, flightNumber: string, totalDistanceKm?: number | null, durationMs: number, remainingDurationMs: number, progressPercent: number, co2EmissionKgEconomy?: number | null, co2EmissionKgFirst?: number | null, co2EmissionKgBusiness?: number | null, co2EmissionKgEco?: number | null, originIata: string, originTerminal?: string | null, originGate?: string | null, originUtcHourOffset: number, status: FlightStatus, destinationIata: string, destinationGate?: string | null, destinationTerminal?: string | null, destinationBaggageClaim?: string | null, destinationUtcHourOffset: number, scheduledGateDeparture: any, scheduledGateArrival: any, estimatedGateDeparture: any, estimatedGateArrival: any, actualGateDeparture?: any | null, actualGateArrival?: any | null, updatedAt: any, Airline: { __typename?: 'Airline', id: string, name: string, logoCompactImageURL?: string | null }, Origin: { __typename?: 'Airport', id: string, name: string, cityName: string, countryCode: string, cityCode: string, iata?: string | null, timezone: string, latitude: number, longitude: number }, Destination: { __typename?: 'Airport', id: string, name: string, cityName: string, countryCode: string, cityCode: string, iata?: string | null, timezone: string, latitude: number, longitude: number } } };

export type UserActiveFlightsQueryVariables = Exact<{ [key: string]: never; }>;


export type UserActiveFlightsQuery = { __typename?: 'Query', userActiveFlights: Array<{ __typename?: 'UserFlight', id: string, flightID: string, createdAt: any, shouldAlert: boolean, Flight: { __typename?: 'Flight', id: string, airlineIata: string, aircraftTailNumber?: string | null, flightNumber: string, totalDistanceKm?: number | null, durationMs: number, remainingDurationMs: number, progressPercent: number, co2EmissionKgEconomy?: number | null, co2EmissionKgFirst?: number | null, co2EmissionKgBusiness?: number | null, co2EmissionKgEco?: number | null, originIata: string, originTerminal?: string | null, originGate?: string | null, originUtcHourOffset: number, status: FlightStatus, destinationIata: string, destinationGate?: string | null, destinationTerminal?: string | null, destinationBaggageClaim?: string | null, destinationUtcHourOffset: number, scheduledGateDeparture: any, scheduledGateArrival: any, estimatedGateDeparture: any, estimatedGateArrival: any, actualGateDeparture?: any | null, actualGateArrival?: any | null, updatedAt: any, Airline: { __typename?: 'Airline', id: string, name: string, logoCompactImageURL?: string | null }, Origin: { __typename?: 'Airport', id: string, name: string, cityName: string, countryCode: string, cityCode: string, iata?: string | null, timezone: string, latitude: number, longitude: number }, Destination: { __typename?: 'Airport', id: string, name: string, cityName: string, countryCode: string, cityCode: string, iata?: string | null, timezone: string, latitude: number, longitude: number } } }> };

export type UserArchivedFlightsQueryVariables = Exact<{ [key: string]: never; }>;


export type UserArchivedFlightsQuery = { __typename?: 'Query', userArchivedFlights: Array<{ __typename?: 'UserFlight', id: string, flightID: string, createdAt: any, Flight: { __typename?: 'Flight', id: string, airlineIata: string, aircraftTailNumber?: string | null, flightNumber: string, totalDistanceKm?: number | null, durationMs: number, remainingDurationMs: number, progressPercent: number, co2EmissionKgEconomy?: number | null, co2EmissionKgFirst?: number | null, co2EmissionKgBusiness?: number | null, co2EmissionKgEco?: number | null, originIata: string, originTerminal?: string | null, originGate?: string | null, originUtcHourOffset: number, status: FlightStatus, destinationIata: string, destinationGate?: string | null, destinationTerminal?: string | null, destinationBaggageClaim?: string | null, destinationUtcHourOffset: number, scheduledGateDeparture: any, scheduledGateArrival: any, estimatedGateDeparture: any, estimatedGateArrival: any, actualGateDeparture?: any | null, actualGateArrival?: any | null, updatedAt: any, Airline: { __typename?: 'Airline', id: string, name: string, logoCompactImageURL?: string | null }, Origin: { __typename?: 'Airport', id: string, name: string, cityName: string, countryCode: string, cityCode: string, iata?: string | null, timezone: string, latitude: number, longitude: number }, Destination: { __typename?: 'Airport', id: string, name: string, cityName: string, countryCode: string, cityCode: string, iata?: string | null, timezone: string, latitude: number, longitude: number } } }> };

export type AddUserFlightMutationVariables = Exact<{
  flightID: Scalars['String']['input'];
}>;


export type AddUserFlightMutation = { __typename?: 'Mutation', addUserFlight: string };

export type DeleteUserFlightMutationVariables = Exact<{
  flightID: Scalars['String']['input'];
}>;


export type DeleteUserFlightMutation = { __typename?: 'Mutation', deleteUserFlight: string };

export type UserHasFlightsQueryVariables = Exact<{ [key: string]: never; }>;


export type UserHasFlightsQuery = { __typename?: 'Query', userHasFlights: boolean };

export type UserFlightQueryVariables = Exact<{
  flightID: Scalars['String']['input'];
}>;


export type UserFlightQuery = { __typename?: 'Query', userFlight?: { __typename?: 'UserFlight', id: string, shouldAlert: boolean } | null };

export type SyncUserMutationVariables = Exact<{ [key: string]: never; }>;


export type SyncUserMutation = { __typename?: 'Mutation', syncUser: boolean };

export type DeleteUserMutationVariables = Exact<{ [key: string]: never; }>;


export type DeleteUserMutation = { __typename?: 'Mutation', deleteUser: boolean };

export type PreferenceQueryVariables = Exact<{ [key: string]: never; }>;


export type PreferenceQuery = { __typename?: 'Query', userPreference: { __typename?: 'UserPreference', measurement: MeasurementType, dateFormat: DateFormatType } };

export type UpdatePreferenceMutationVariables = Exact<{
  data: UpdateUserPreferenceInput;
}>;


export type UpdatePreferenceMutation = { __typename?: 'Mutation', updateUserPreference: boolean };

export type IsInWaitListQueryVariables = Exact<{
  feature: Scalars['String']['input'];
}>;


export type IsInWaitListQuery = { __typename?: 'Query', userIsInWaitList: boolean };

export type AddToWaitListMutationVariables = Exact<{
  feature: Scalars['String']['input'];
}>;


export type AddToWaitListMutation = { __typename?: 'Mutation', addToWaitList: string };

export type RemoveFromWaitListMutationVariables = Exact<{
  feature: Scalars['String']['input'];
}>;


export type RemoveFromWaitListMutation = { __typename?: 'Mutation', removeFromWaitList: string };

export const FullFlightFragmentFragmentDoc = gql`
    fragment FullFlightFragment on Flight {
  id
  airlineIata
  Airline {
    id
    name
    logoCompactImageURL
  }
  aircraftTailNumber
  flightNumber
  totalDistanceKm
  durationMs
  remainingDurationMs
  progressPercent
  co2EmissionKgEconomy
  co2EmissionKgFirst
  co2EmissionKgBusiness
  co2EmissionKgEco
  originIata
  originTerminal
  originGate
  originUtcHourOffset
  Origin {
    id
    name
    cityName
    countryCode
    cityCode
    iata
    timezone
    latitude
    longitude
  }
  status
  destinationIata
  destinationGate
  destinationTerminal
  destinationBaggageClaim
  destinationUtcHourOffset
  Destination {
    id
    name
    cityName
    countryCode
    cityCode
    iata
    timezone
    latitude
    longitude
  }
  scheduledGateDeparture
  scheduledGateArrival
  estimatedGateDeparture
  estimatedGateArrival
  actualGateDeparture
  actualGateArrival
  updatedAt
}
    `;
export const AircraftDocument = gql`
    query Aircraft($tailNumber: String!) {
  aircraft(tailNumber: $tailNumber) {
    id
    iata
    icao
    model
    airlineIata
    description
    tailNumber
    firstFlight
    imageURL
    createdAt
    updatedAt
  }
}
    `;

/**
 * __useAircraftQuery__
 *
 * To run a query within a React component, call `useAircraftQuery` and pass it any options that fit your needs.
 * When your component renders, `useAircraftQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAircraftQuery({
 *   variables: {
 *      tailNumber: // value for 'tailNumber'
 *   },
 * });
 */
export function useAircraftQuery(baseOptions: Apollo.QueryHookOptions<AircraftQuery, AircraftQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AircraftQuery, AircraftQueryVariables>(AircraftDocument, options);
      }
export function useAircraftLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AircraftQuery, AircraftQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AircraftQuery, AircraftQueryVariables>(AircraftDocument, options);
        }
export function useAircraftSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<AircraftQuery, AircraftQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<AircraftQuery, AircraftQueryVariables>(AircraftDocument, options);
        }
export type AircraftQueryHookResult = ReturnType<typeof useAircraftQuery>;
export type AircraftLazyQueryHookResult = ReturnType<typeof useAircraftLazyQuery>;
export type AircraftSuspenseQueryHookResult = ReturnType<typeof useAircraftSuspenseQuery>;
export type AircraftQueryResult = Apollo.QueryResult<AircraftQuery, AircraftQueryVariables>;
export function refetchAircraftQuery(variables: AircraftQueryVariables) {
      return { query: AircraftDocument, variables: variables }
    }
export const AircraftPositionDocument = gql`
    query AircraftPosition($aircraftID: Float!) {
  aircraftPosition(aircraftID: $aircraftID) {
    id
    aircraftID
    latitude
    longitude
    altitude
    flightYear
    flightMonth
    flightDate
    flightNumber
    airlineIata
    originIata
    destinationIata
    createdAt
    updatedAt
  }
}
    `;

/**
 * __useAircraftPositionQuery__
 *
 * To run a query within a React component, call `useAircraftPositionQuery` and pass it any options that fit your needs.
 * When your component renders, `useAircraftPositionQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAircraftPositionQuery({
 *   variables: {
 *      aircraftID: // value for 'aircraftID'
 *   },
 * });
 */
export function useAircraftPositionQuery(baseOptions: Apollo.QueryHookOptions<AircraftPositionQuery, AircraftPositionQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AircraftPositionQuery, AircraftPositionQueryVariables>(AircraftPositionDocument, options);
      }
export function useAircraftPositionLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AircraftPositionQuery, AircraftPositionQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AircraftPositionQuery, AircraftPositionQueryVariables>(AircraftPositionDocument, options);
        }
export function useAircraftPositionSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<AircraftPositionQuery, AircraftPositionQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<AircraftPositionQuery, AircraftPositionQueryVariables>(AircraftPositionDocument, options);
        }
export type AircraftPositionQueryHookResult = ReturnType<typeof useAircraftPositionQuery>;
export type AircraftPositionLazyQueryHookResult = ReturnType<typeof useAircraftPositionLazyQuery>;
export type AircraftPositionSuspenseQueryHookResult = ReturnType<typeof useAircraftPositionSuspenseQuery>;
export type AircraftPositionQueryResult = Apollo.QueryResult<AircraftPositionQuery, AircraftPositionQueryVariables>;
export function refetchAircraftPositionQuery(variables: AircraftPositionQueryVariables) {
      return { query: AircraftPositionDocument, variables: variables }
    }
export const AirlinesDocument = gql`
    query Airlines {
  airlines {
    id
    name
    iata
    logoCompactImageURL
    logoCompactImageType
  }
}
    `;

/**
 * __useAirlinesQuery__
 *
 * To run a query within a React component, call `useAirlinesQuery` and pass it any options that fit your needs.
 * When your component renders, `useAirlinesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAirlinesQuery({
 *   variables: {
 *   },
 * });
 */
export function useAirlinesQuery(baseOptions?: Apollo.QueryHookOptions<AirlinesQuery, AirlinesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AirlinesQuery, AirlinesQueryVariables>(AirlinesDocument, options);
      }
export function useAirlinesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AirlinesQuery, AirlinesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AirlinesQuery, AirlinesQueryVariables>(AirlinesDocument, options);
        }
export function useAirlinesSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<AirlinesQuery, AirlinesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<AirlinesQuery, AirlinesQueryVariables>(AirlinesDocument, options);
        }
export type AirlinesQueryHookResult = ReturnType<typeof useAirlinesQuery>;
export type AirlinesLazyQueryHookResult = ReturnType<typeof useAirlinesLazyQuery>;
export type AirlinesSuspenseQueryHookResult = ReturnType<typeof useAirlinesSuspenseQuery>;
export type AirlinesQueryResult = Apollo.QueryResult<AirlinesQuery, AirlinesQueryVariables>;
export function refetchAirlinesQuery(variables?: AirlinesQueryVariables) {
      return { query: AirlinesDocument, variables: variables }
    }
export const AirlineDocument = gql`
    query Airline($iata: String!) {
  airline(iata: $iata) {
    id
    name
    iata
    logoCompactImageURL
    logoCompactImageType
    logoFullImageURL
    logoFullImageType
  }
}
    `;

/**
 * __useAirlineQuery__
 *
 * To run a query within a React component, call `useAirlineQuery` and pass it any options that fit your needs.
 * When your component renders, `useAirlineQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAirlineQuery({
 *   variables: {
 *      iata: // value for 'iata'
 *   },
 * });
 */
export function useAirlineQuery(baseOptions: Apollo.QueryHookOptions<AirlineQuery, AirlineQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AirlineQuery, AirlineQueryVariables>(AirlineDocument, options);
      }
export function useAirlineLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AirlineQuery, AirlineQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AirlineQuery, AirlineQueryVariables>(AirlineDocument, options);
        }
export function useAirlineSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<AirlineQuery, AirlineQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<AirlineQuery, AirlineQueryVariables>(AirlineDocument, options);
        }
export type AirlineQueryHookResult = ReturnType<typeof useAirlineQuery>;
export type AirlineLazyQueryHookResult = ReturnType<typeof useAirlineLazyQuery>;
export type AirlineSuspenseQueryHookResult = ReturnType<typeof useAirlineSuspenseQuery>;
export type AirlineQueryResult = Apollo.QueryResult<AirlineQuery, AirlineQueryVariables>;
export function refetchAirlineQuery(variables: AirlineQueryVariables) {
      return { query: AirlineDocument, variables: variables }
    }
export const AirportDocument = gql`
    query Airport($airportIata: String!) {
  airport(airportIata: $airportIata) {
    id
    name
    iata
    cityName
    cityCode
    timezone
    state
    elevation
    countryCode
    countyName
  }
}
    `;

/**
 * __useAirportQuery__
 *
 * To run a query within a React component, call `useAirportQuery` and pass it any options that fit your needs.
 * When your component renders, `useAirportQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAirportQuery({
 *   variables: {
 *      airportIata: // value for 'airportIata'
 *   },
 * });
 */
export function useAirportQuery(baseOptions: Apollo.QueryHookOptions<AirportQuery, AirportQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AirportQuery, AirportQueryVariables>(AirportDocument, options);
      }
export function useAirportLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AirportQuery, AirportQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AirportQuery, AirportQueryVariables>(AirportDocument, options);
        }
export function useAirportSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<AirportQuery, AirportQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<AirportQuery, AirportQueryVariables>(AirportDocument, options);
        }
export type AirportQueryHookResult = ReturnType<typeof useAirportQuery>;
export type AirportLazyQueryHookResult = ReturnType<typeof useAirportLazyQuery>;
export type AirportSuspenseQueryHookResult = ReturnType<typeof useAirportSuspenseQuery>;
export type AirportQueryResult = Apollo.QueryResult<AirportQuery, AirportQueryVariables>;
export function refetchAirportQuery(variables: AirportQueryVariables) {
      return { query: AirportDocument, variables: variables }
    }
export const AirportTsaCheckpointsStatusDocument = gql`
    query AirportTsaCheckpointsStatus($dayOfWeek: Float!, $airportIata: String!) {
  airportTsaCheckpointsStatus(dayOfWeek: $dayOfWeek, airportIata: $airportIata) {
    checkpoints {
      checkPointName
      hours {
        hour
        status
      }
    }
    terminalName
  }
}
    `;

/**
 * __useAirportTsaCheckpointsStatusQuery__
 *
 * To run a query within a React component, call `useAirportTsaCheckpointsStatusQuery` and pass it any options that fit your needs.
 * When your component renders, `useAirportTsaCheckpointsStatusQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAirportTsaCheckpointsStatusQuery({
 *   variables: {
 *      dayOfWeek: // value for 'dayOfWeek'
 *      airportIata: // value for 'airportIata'
 *   },
 * });
 */
export function useAirportTsaCheckpointsStatusQuery(baseOptions: Apollo.QueryHookOptions<AirportTsaCheckpointsStatusQuery, AirportTsaCheckpointsStatusQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AirportTsaCheckpointsStatusQuery, AirportTsaCheckpointsStatusQueryVariables>(AirportTsaCheckpointsStatusDocument, options);
      }
export function useAirportTsaCheckpointsStatusLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AirportTsaCheckpointsStatusQuery, AirportTsaCheckpointsStatusQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AirportTsaCheckpointsStatusQuery, AirportTsaCheckpointsStatusQueryVariables>(AirportTsaCheckpointsStatusDocument, options);
        }
export function useAirportTsaCheckpointsStatusSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<AirportTsaCheckpointsStatusQuery, AirportTsaCheckpointsStatusQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<AirportTsaCheckpointsStatusQuery, AirportTsaCheckpointsStatusQueryVariables>(AirportTsaCheckpointsStatusDocument, options);
        }
export type AirportTsaCheckpointsStatusQueryHookResult = ReturnType<typeof useAirportTsaCheckpointsStatusQuery>;
export type AirportTsaCheckpointsStatusLazyQueryHookResult = ReturnType<typeof useAirportTsaCheckpointsStatusLazyQuery>;
export type AirportTsaCheckpointsStatusSuspenseQueryHookResult = ReturnType<typeof useAirportTsaCheckpointsStatusSuspenseQuery>;
export type AirportTsaCheckpointsStatusQueryResult = Apollo.QueryResult<AirportTsaCheckpointsStatusQuery, AirportTsaCheckpointsStatusQueryVariables>;
export function refetchAirportTsaCheckpointsStatusQuery(variables: AirportTsaCheckpointsStatusQueryVariables) {
      return { query: AirportTsaCheckpointsStatusDocument, variables: variables }
    }
export const AirportTsaWaitTimeDocument = gql`
    query AirportTsaWaitTime($airportIata: String!) {
  airportTsaWaitTime(airportIata: $airportIata) {
    dayOfWeek
    hour
    maxWaitMinute
  }
}
    `;

/**
 * __useAirportTsaWaitTimeQuery__
 *
 * To run a query within a React component, call `useAirportTsaWaitTimeQuery` and pass it any options that fit your needs.
 * When your component renders, `useAirportTsaWaitTimeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAirportTsaWaitTimeQuery({
 *   variables: {
 *      airportIata: // value for 'airportIata'
 *   },
 * });
 */
export function useAirportTsaWaitTimeQuery(baseOptions: Apollo.QueryHookOptions<AirportTsaWaitTimeQuery, AirportTsaWaitTimeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AirportTsaWaitTimeQuery, AirportTsaWaitTimeQueryVariables>(AirportTsaWaitTimeDocument, options);
      }
export function useAirportTsaWaitTimeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AirportTsaWaitTimeQuery, AirportTsaWaitTimeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AirportTsaWaitTimeQuery, AirportTsaWaitTimeQueryVariables>(AirportTsaWaitTimeDocument, options);
        }
export function useAirportTsaWaitTimeSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<AirportTsaWaitTimeQuery, AirportTsaWaitTimeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<AirportTsaWaitTimeQuery, AirportTsaWaitTimeQueryVariables>(AirportTsaWaitTimeDocument, options);
        }
export type AirportTsaWaitTimeQueryHookResult = ReturnType<typeof useAirportTsaWaitTimeQuery>;
export type AirportTsaWaitTimeLazyQueryHookResult = ReturnType<typeof useAirportTsaWaitTimeLazyQuery>;
export type AirportTsaWaitTimeSuspenseQueryHookResult = ReturnType<typeof useAirportTsaWaitTimeSuspenseQuery>;
export type AirportTsaWaitTimeQueryResult = Apollo.QueryResult<AirportTsaWaitTimeQuery, AirportTsaWaitTimeQueryVariables>;
export function refetchAirportTsaWaitTimeQuery(variables: AirportTsaWaitTimeQueryVariables) {
      return { query: AirportTsaWaitTimeDocument, variables: variables }
    }
export const AirportWeatherDocument = gql`
    query AirportWeather($hour: Int!, $date: Int!, $month: Int!, $year: Int!, $airportIata: String!) {
  airportWeather(
    hour: $hour
    date: $date
    month: $month
    year: $year
    airportIata: $airportIata
  ) {
    id
    airportIata
    airTemperatureCelsius
    precipitationAmountMillimeter
    windSpeedMeterPerSecond
    windFromDirectionDegrees
    status
    iconURL
  }
}
    `;

/**
 * __useAirportWeatherQuery__
 *
 * To run a query within a React component, call `useAirportWeatherQuery` and pass it any options that fit your needs.
 * When your component renders, `useAirportWeatherQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAirportWeatherQuery({
 *   variables: {
 *      hour: // value for 'hour'
 *      date: // value for 'date'
 *      month: // value for 'month'
 *      year: // value for 'year'
 *      airportIata: // value for 'airportIata'
 *   },
 * });
 */
export function useAirportWeatherQuery(baseOptions: Apollo.QueryHookOptions<AirportWeatherQuery, AirportWeatherQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AirportWeatherQuery, AirportWeatherQueryVariables>(AirportWeatherDocument, options);
      }
export function useAirportWeatherLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AirportWeatherQuery, AirportWeatherQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AirportWeatherQuery, AirportWeatherQueryVariables>(AirportWeatherDocument, options);
        }
export function useAirportWeatherSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<AirportWeatherQuery, AirportWeatherQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<AirportWeatherQuery, AirportWeatherQueryVariables>(AirportWeatherDocument, options);
        }
export type AirportWeatherQueryHookResult = ReturnType<typeof useAirportWeatherQuery>;
export type AirportWeatherLazyQueryHookResult = ReturnType<typeof useAirportWeatherLazyQuery>;
export type AirportWeatherSuspenseQueryHookResult = ReturnType<typeof useAirportWeatherSuspenseQuery>;
export type AirportWeatherQueryResult = Apollo.QueryResult<AirportWeatherQuery, AirportWeatherQueryVariables>;
export function refetchAirportWeatherQuery(variables: AirportWeatherQueryVariables) {
      return { query: AirportWeatherDocument, variables: variables }
    }
export const AirportWeatherDayDocument = gql`
    query AirportWeatherDay($date: Int!, $month: Int!, $year: Int!, $airportIata: String!) {
  airportWeatherDay(
    date: $date
    month: $month
    year: $year
    airportIata: $airportIata
  ) {
    id
    airportIata
    airTemperatureCelsius
    precipitationAmountMillimeter
    windSpeedMeterPerSecond
    windFromDirectionDegrees
    status
    iconURL
    date
    hour
    month
    year
  }
}
    `;

/**
 * __useAirportWeatherDayQuery__
 *
 * To run a query within a React component, call `useAirportWeatherDayQuery` and pass it any options that fit your needs.
 * When your component renders, `useAirportWeatherDayQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAirportWeatherDayQuery({
 *   variables: {
 *      date: // value for 'date'
 *      month: // value for 'month'
 *      year: // value for 'year'
 *      airportIata: // value for 'airportIata'
 *   },
 * });
 */
export function useAirportWeatherDayQuery(baseOptions: Apollo.QueryHookOptions<AirportWeatherDayQuery, AirportWeatherDayQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AirportWeatherDayQuery, AirportWeatherDayQueryVariables>(AirportWeatherDayDocument, options);
      }
export function useAirportWeatherDayLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AirportWeatherDayQuery, AirportWeatherDayQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AirportWeatherDayQuery, AirportWeatherDayQueryVariables>(AirportWeatherDayDocument, options);
        }
export function useAirportWeatherDaySuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<AirportWeatherDayQuery, AirportWeatherDayQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<AirportWeatherDayQuery, AirportWeatherDayQueryVariables>(AirportWeatherDayDocument, options);
        }
export type AirportWeatherDayQueryHookResult = ReturnType<typeof useAirportWeatherDayQuery>;
export type AirportWeatherDayLazyQueryHookResult = ReturnType<typeof useAirportWeatherDayLazyQuery>;
export type AirportWeatherDaySuspenseQueryHookResult = ReturnType<typeof useAirportWeatherDaySuspenseQuery>;
export type AirportWeatherDayQueryResult = Apollo.QueryResult<AirportWeatherDayQuery, AirportWeatherDayQueryVariables>;
export function refetchAirportWeatherDayQuery(variables: AirportWeatherDayQueryVariables) {
      return { query: AirportWeatherDayDocument, variables: variables }
    }
export const DebugFlightNotificationDocument = gql`
    mutation DebugFlightNotification($flightID: String!, $title: String!, $body: String!, $data: JSON) {
  _sendFlightNotification(
    flightID: $flightID
    title: $title
    body: $body
    data: $data
  )
}
    `;
export type DebugFlightNotificationMutationFn = Apollo.MutationFunction<DebugFlightNotificationMutation, DebugFlightNotificationMutationVariables>;

/**
 * __useDebugFlightNotificationMutation__
 *
 * To run a mutation, you first call `useDebugFlightNotificationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDebugFlightNotificationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [debugFlightNotificationMutation, { data, loading, error }] = useDebugFlightNotificationMutation({
 *   variables: {
 *      flightID: // value for 'flightID'
 *      title: // value for 'title'
 *      body: // value for 'body'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useDebugFlightNotificationMutation(baseOptions?: Apollo.MutationHookOptions<DebugFlightNotificationMutation, DebugFlightNotificationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DebugFlightNotificationMutation, DebugFlightNotificationMutationVariables>(DebugFlightNotificationDocument, options);
      }
export type DebugFlightNotificationMutationHookResult = ReturnType<typeof useDebugFlightNotificationMutation>;
export type DebugFlightNotificationMutationResult = Apollo.MutationResult<DebugFlightNotificationMutation>;
export type DebugFlightNotificationMutationOptions = Apollo.BaseMutationOptions<DebugFlightNotificationMutation, DebugFlightNotificationMutationVariables>;
export const RecentFeedbackDocument = gql`
    query RecentFeedback {
  recentFeedback {
    id
  }
}
    `;

/**
 * __useRecentFeedbackQuery__
 *
 * To run a query within a React component, call `useRecentFeedbackQuery` and pass it any options that fit your needs.
 * When your component renders, `useRecentFeedbackQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useRecentFeedbackQuery({
 *   variables: {
 *   },
 * });
 */
export function useRecentFeedbackQuery(baseOptions?: Apollo.QueryHookOptions<RecentFeedbackQuery, RecentFeedbackQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<RecentFeedbackQuery, RecentFeedbackQueryVariables>(RecentFeedbackDocument, options);
      }
export function useRecentFeedbackLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<RecentFeedbackQuery, RecentFeedbackQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<RecentFeedbackQuery, RecentFeedbackQueryVariables>(RecentFeedbackDocument, options);
        }
export function useRecentFeedbackSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<RecentFeedbackQuery, RecentFeedbackQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<RecentFeedbackQuery, RecentFeedbackQueryVariables>(RecentFeedbackDocument, options);
        }
export type RecentFeedbackQueryHookResult = ReturnType<typeof useRecentFeedbackQuery>;
export type RecentFeedbackLazyQueryHookResult = ReturnType<typeof useRecentFeedbackLazyQuery>;
export type RecentFeedbackSuspenseQueryHookResult = ReturnType<typeof useRecentFeedbackSuspenseQuery>;
export type RecentFeedbackQueryResult = Apollo.QueryResult<RecentFeedbackQuery, RecentFeedbackQueryVariables>;
export function refetchRecentFeedbackQuery(variables?: RecentFeedbackQueryVariables) {
      return { query: RecentFeedbackDocument, variables: variables }
    }
export const SubmitFeedbackDocument = gql`
    mutation SubmitFeedback($type: FeedbackType!, $rating: Float!, $message: String!) {
  submitFeedback(type: $type, rating: $rating, message: $message)
}
    `;
export type SubmitFeedbackMutationFn = Apollo.MutationFunction<SubmitFeedbackMutation, SubmitFeedbackMutationVariables>;

/**
 * __useSubmitFeedbackMutation__
 *
 * To run a mutation, you first call `useSubmitFeedbackMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSubmitFeedbackMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [submitFeedbackMutation, { data, loading, error }] = useSubmitFeedbackMutation({
 *   variables: {
 *      type: // value for 'type'
 *      rating: // value for 'rating'
 *      message: // value for 'message'
 *   },
 * });
 */
export function useSubmitFeedbackMutation(baseOptions?: Apollo.MutationHookOptions<SubmitFeedbackMutation, SubmitFeedbackMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SubmitFeedbackMutation, SubmitFeedbackMutationVariables>(SubmitFeedbackDocument, options);
      }
export type SubmitFeedbackMutationHookResult = ReturnType<typeof useSubmitFeedbackMutation>;
export type SubmitFeedbackMutationResult = Apollo.MutationResult<SubmitFeedbackMutation>;
export type SubmitFeedbackMutationOptions = Apollo.BaseMutationOptions<SubmitFeedbackMutation, SubmitFeedbackMutationVariables>;
export const FindFlightsDocument = gql`
    query FindFlights($airlineIata: String!, $flightNumber: String!, $year: Int!, $month: Int!, $date: Int!) {
  flights(
    airlineIata: $airlineIata
    flightNumber: $flightNumber
    year: $year
    month: $month
    date: $date
  ) {
    ...FullFlightFragment
  }
}
    ${FullFlightFragmentFragmentDoc}`;

/**
 * __useFindFlightsQuery__
 *
 * To run a query within a React component, call `useFindFlightsQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindFlightsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindFlightsQuery({
 *   variables: {
 *      airlineIata: // value for 'airlineIata'
 *      flightNumber: // value for 'flightNumber'
 *      year: // value for 'year'
 *      month: // value for 'month'
 *      date: // value for 'date'
 *   },
 * });
 */
export function useFindFlightsQuery(baseOptions: Apollo.QueryHookOptions<FindFlightsQuery, FindFlightsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindFlightsQuery, FindFlightsQueryVariables>(FindFlightsDocument, options);
      }
export function useFindFlightsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindFlightsQuery, FindFlightsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindFlightsQuery, FindFlightsQueryVariables>(FindFlightsDocument, options);
        }
export function useFindFlightsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<FindFlightsQuery, FindFlightsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<FindFlightsQuery, FindFlightsQueryVariables>(FindFlightsDocument, options);
        }
export type FindFlightsQueryHookResult = ReturnType<typeof useFindFlightsQuery>;
export type FindFlightsLazyQueryHookResult = ReturnType<typeof useFindFlightsLazyQuery>;
export type FindFlightsSuspenseQueryHookResult = ReturnType<typeof useFindFlightsSuspenseQuery>;
export type FindFlightsQueryResult = Apollo.QueryResult<FindFlightsQuery, FindFlightsQueryVariables>;
export function refetchFindFlightsQuery(variables: FindFlightsQueryVariables) {
      return { query: FindFlightsDocument, variables: variables }
    }
export const FlightPromptnessDocument = gql`
    query FlightPromptness($flightID: String!) {
  flightPromptness(flightID: $flightID) {
    onTimePercent
    rating
    averageDelayTimeMs
  }
}
    `;

/**
 * __useFlightPromptnessQuery__
 *
 * To run a query within a React component, call `useFlightPromptnessQuery` and pass it any options that fit your needs.
 * When your component renders, `useFlightPromptnessQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFlightPromptnessQuery({
 *   variables: {
 *      flightID: // value for 'flightID'
 *   },
 * });
 */
export function useFlightPromptnessQuery(baseOptions: Apollo.QueryHookOptions<FlightPromptnessQuery, FlightPromptnessQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FlightPromptnessQuery, FlightPromptnessQueryVariables>(FlightPromptnessDocument, options);
      }
export function useFlightPromptnessLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FlightPromptnessQuery, FlightPromptnessQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FlightPromptnessQuery, FlightPromptnessQueryVariables>(FlightPromptnessDocument, options);
        }
export function useFlightPromptnessSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<FlightPromptnessQuery, FlightPromptnessQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<FlightPromptnessQuery, FlightPromptnessQueryVariables>(FlightPromptnessDocument, options);
        }
export type FlightPromptnessQueryHookResult = ReturnType<typeof useFlightPromptnessQuery>;
export type FlightPromptnessLazyQueryHookResult = ReturnType<typeof useFlightPromptnessLazyQuery>;
export type FlightPromptnessSuspenseQueryHookResult = ReturnType<typeof useFlightPromptnessSuspenseQuery>;
export type FlightPromptnessQueryResult = Apollo.QueryResult<FlightPromptnessQuery, FlightPromptnessQueryVariables>;
export function refetchFlightPromptnessQuery(variables: FlightPromptnessQueryVariables) {
      return { query: FlightPromptnessDocument, variables: variables }
    }
export const FlightDocument = gql`
    query Flight($flightID: String!) {
  flight(flightID: $flightID) {
    ...FullFlightFragment
  }
}
    ${FullFlightFragmentFragmentDoc}`;

/**
 * __useFlightQuery__
 *
 * To run a query within a React component, call `useFlightQuery` and pass it any options that fit your needs.
 * When your component renders, `useFlightQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFlightQuery({
 *   variables: {
 *      flightID: // value for 'flightID'
 *   },
 * });
 */
export function useFlightQuery(baseOptions: Apollo.QueryHookOptions<FlightQuery, FlightQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FlightQuery, FlightQueryVariables>(FlightDocument, options);
      }
export function useFlightLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FlightQuery, FlightQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FlightQuery, FlightQueryVariables>(FlightDocument, options);
        }
export function useFlightSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<FlightQuery, FlightQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<FlightQuery, FlightQueryVariables>(FlightDocument, options);
        }
export type FlightQueryHookResult = ReturnType<typeof useFlightQuery>;
export type FlightLazyQueryHookResult = ReturnType<typeof useFlightLazyQuery>;
export type FlightSuspenseQueryHookResult = ReturnType<typeof useFlightSuspenseQuery>;
export type FlightQueryResult = Apollo.QueryResult<FlightQuery, FlightQueryVariables>;
export function refetchFlightQuery(variables: FlightQueryVariables) {
      return { query: FlightDocument, variables: variables }
    }
export const RandomFlightDocument = gql`
    query RandomFlight {
  randomFlight {
    ...FullFlightFragment
  }
}
    ${FullFlightFragmentFragmentDoc}`;

/**
 * __useRandomFlightQuery__
 *
 * To run a query within a React component, call `useRandomFlightQuery` and pass it any options that fit your needs.
 * When your component renders, `useRandomFlightQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useRandomFlightQuery({
 *   variables: {
 *   },
 * });
 */
export function useRandomFlightQuery(baseOptions?: Apollo.QueryHookOptions<RandomFlightQuery, RandomFlightQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<RandomFlightQuery, RandomFlightQueryVariables>(RandomFlightDocument, options);
      }
export function useRandomFlightLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<RandomFlightQuery, RandomFlightQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<RandomFlightQuery, RandomFlightQueryVariables>(RandomFlightDocument, options);
        }
export function useRandomFlightSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<RandomFlightQuery, RandomFlightQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<RandomFlightQuery, RandomFlightQueryVariables>(RandomFlightDocument, options);
        }
export type RandomFlightQueryHookResult = ReturnType<typeof useRandomFlightQuery>;
export type RandomFlightLazyQueryHookResult = ReturnType<typeof useRandomFlightLazyQuery>;
export type RandomFlightSuspenseQueryHookResult = ReturnType<typeof useRandomFlightSuspenseQuery>;
export type RandomFlightQueryResult = Apollo.QueryResult<RandomFlightQuery, RandomFlightQueryVariables>;
export function refetchRandomFlightQuery(variables?: RandomFlightQueryVariables) {
      return { query: RandomFlightDocument, variables: variables }
    }
export const UserActiveFlightsDocument = gql`
    query UserActiveFlights {
  userActiveFlights {
    id
    flightID
    createdAt
    shouldAlert
    Flight {
      ...FullFlightFragment
    }
  }
}
    ${FullFlightFragmentFragmentDoc}`;

/**
 * __useUserActiveFlightsQuery__
 *
 * To run a query within a React component, call `useUserActiveFlightsQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserActiveFlightsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserActiveFlightsQuery({
 *   variables: {
 *   },
 * });
 */
export function useUserActiveFlightsQuery(baseOptions?: Apollo.QueryHookOptions<UserActiveFlightsQuery, UserActiveFlightsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UserActiveFlightsQuery, UserActiveFlightsQueryVariables>(UserActiveFlightsDocument, options);
      }
export function useUserActiveFlightsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserActiveFlightsQuery, UserActiveFlightsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UserActiveFlightsQuery, UserActiveFlightsQueryVariables>(UserActiveFlightsDocument, options);
        }
export function useUserActiveFlightsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<UserActiveFlightsQuery, UserActiveFlightsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<UserActiveFlightsQuery, UserActiveFlightsQueryVariables>(UserActiveFlightsDocument, options);
        }
export type UserActiveFlightsQueryHookResult = ReturnType<typeof useUserActiveFlightsQuery>;
export type UserActiveFlightsLazyQueryHookResult = ReturnType<typeof useUserActiveFlightsLazyQuery>;
export type UserActiveFlightsSuspenseQueryHookResult = ReturnType<typeof useUserActiveFlightsSuspenseQuery>;
export type UserActiveFlightsQueryResult = Apollo.QueryResult<UserActiveFlightsQuery, UserActiveFlightsQueryVariables>;
export function refetchUserActiveFlightsQuery(variables?: UserActiveFlightsQueryVariables) {
      return { query: UserActiveFlightsDocument, variables: variables }
    }
export const UserArchivedFlightsDocument = gql`
    query UserArchivedFlights {
  userArchivedFlights {
    id
    flightID
    createdAt
    Flight {
      ...FullFlightFragment
    }
  }
}
    ${FullFlightFragmentFragmentDoc}`;

/**
 * __useUserArchivedFlightsQuery__
 *
 * To run a query within a React component, call `useUserArchivedFlightsQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserArchivedFlightsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserArchivedFlightsQuery({
 *   variables: {
 *   },
 * });
 */
export function useUserArchivedFlightsQuery(baseOptions?: Apollo.QueryHookOptions<UserArchivedFlightsQuery, UserArchivedFlightsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UserArchivedFlightsQuery, UserArchivedFlightsQueryVariables>(UserArchivedFlightsDocument, options);
      }
export function useUserArchivedFlightsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserArchivedFlightsQuery, UserArchivedFlightsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UserArchivedFlightsQuery, UserArchivedFlightsQueryVariables>(UserArchivedFlightsDocument, options);
        }
export function useUserArchivedFlightsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<UserArchivedFlightsQuery, UserArchivedFlightsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<UserArchivedFlightsQuery, UserArchivedFlightsQueryVariables>(UserArchivedFlightsDocument, options);
        }
export type UserArchivedFlightsQueryHookResult = ReturnType<typeof useUserArchivedFlightsQuery>;
export type UserArchivedFlightsLazyQueryHookResult = ReturnType<typeof useUserArchivedFlightsLazyQuery>;
export type UserArchivedFlightsSuspenseQueryHookResult = ReturnType<typeof useUserArchivedFlightsSuspenseQuery>;
export type UserArchivedFlightsQueryResult = Apollo.QueryResult<UserArchivedFlightsQuery, UserArchivedFlightsQueryVariables>;
export function refetchUserArchivedFlightsQuery(variables?: UserArchivedFlightsQueryVariables) {
      return { query: UserArchivedFlightsDocument, variables: variables }
    }
export const AddUserFlightDocument = gql`
    mutation AddUserFlight($flightID: String!) {
  addUserFlight(flightID: $flightID)
}
    `;
export type AddUserFlightMutationFn = Apollo.MutationFunction<AddUserFlightMutation, AddUserFlightMutationVariables>;

/**
 * __useAddUserFlightMutation__
 *
 * To run a mutation, you first call `useAddUserFlightMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddUserFlightMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addUserFlightMutation, { data, loading, error }] = useAddUserFlightMutation({
 *   variables: {
 *      flightID: // value for 'flightID'
 *   },
 * });
 */
export function useAddUserFlightMutation(baseOptions?: Apollo.MutationHookOptions<AddUserFlightMutation, AddUserFlightMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddUserFlightMutation, AddUserFlightMutationVariables>(AddUserFlightDocument, options);
      }
export type AddUserFlightMutationHookResult = ReturnType<typeof useAddUserFlightMutation>;
export type AddUserFlightMutationResult = Apollo.MutationResult<AddUserFlightMutation>;
export type AddUserFlightMutationOptions = Apollo.BaseMutationOptions<AddUserFlightMutation, AddUserFlightMutationVariables>;
export const DeleteUserFlightDocument = gql`
    mutation DeleteUserFlight($flightID: String!) {
  deleteUserFlight(flightID: $flightID)
}
    `;
export type DeleteUserFlightMutationFn = Apollo.MutationFunction<DeleteUserFlightMutation, DeleteUserFlightMutationVariables>;

/**
 * __useDeleteUserFlightMutation__
 *
 * To run a mutation, you first call `useDeleteUserFlightMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteUserFlightMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteUserFlightMutation, { data, loading, error }] = useDeleteUserFlightMutation({
 *   variables: {
 *      flightID: // value for 'flightID'
 *   },
 * });
 */
export function useDeleteUserFlightMutation(baseOptions?: Apollo.MutationHookOptions<DeleteUserFlightMutation, DeleteUserFlightMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteUserFlightMutation, DeleteUserFlightMutationVariables>(DeleteUserFlightDocument, options);
      }
export type DeleteUserFlightMutationHookResult = ReturnType<typeof useDeleteUserFlightMutation>;
export type DeleteUserFlightMutationResult = Apollo.MutationResult<DeleteUserFlightMutation>;
export type DeleteUserFlightMutationOptions = Apollo.BaseMutationOptions<DeleteUserFlightMutation, DeleteUserFlightMutationVariables>;
export const UserHasFlightsDocument = gql`
    query UserHasFlights {
  userHasFlights
}
    `;

/**
 * __useUserHasFlightsQuery__
 *
 * To run a query within a React component, call `useUserHasFlightsQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserHasFlightsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserHasFlightsQuery({
 *   variables: {
 *   },
 * });
 */
export function useUserHasFlightsQuery(baseOptions?: Apollo.QueryHookOptions<UserHasFlightsQuery, UserHasFlightsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UserHasFlightsQuery, UserHasFlightsQueryVariables>(UserHasFlightsDocument, options);
      }
export function useUserHasFlightsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserHasFlightsQuery, UserHasFlightsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UserHasFlightsQuery, UserHasFlightsQueryVariables>(UserHasFlightsDocument, options);
        }
export function useUserHasFlightsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<UserHasFlightsQuery, UserHasFlightsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<UserHasFlightsQuery, UserHasFlightsQueryVariables>(UserHasFlightsDocument, options);
        }
export type UserHasFlightsQueryHookResult = ReturnType<typeof useUserHasFlightsQuery>;
export type UserHasFlightsLazyQueryHookResult = ReturnType<typeof useUserHasFlightsLazyQuery>;
export type UserHasFlightsSuspenseQueryHookResult = ReturnType<typeof useUserHasFlightsSuspenseQuery>;
export type UserHasFlightsQueryResult = Apollo.QueryResult<UserHasFlightsQuery, UserHasFlightsQueryVariables>;
export function refetchUserHasFlightsQuery(variables?: UserHasFlightsQueryVariables) {
      return { query: UserHasFlightsDocument, variables: variables }
    }
export const UserFlightDocument = gql`
    query UserFlight($flightID: String!) {
  userFlight(flightID: $flightID) {
    id
    shouldAlert
  }
}
    `;

/**
 * __useUserFlightQuery__
 *
 * To run a query within a React component, call `useUserFlightQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserFlightQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserFlightQuery({
 *   variables: {
 *      flightID: // value for 'flightID'
 *   },
 * });
 */
export function useUserFlightQuery(baseOptions: Apollo.QueryHookOptions<UserFlightQuery, UserFlightQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UserFlightQuery, UserFlightQueryVariables>(UserFlightDocument, options);
      }
export function useUserFlightLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserFlightQuery, UserFlightQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UserFlightQuery, UserFlightQueryVariables>(UserFlightDocument, options);
        }
export function useUserFlightSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<UserFlightQuery, UserFlightQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<UserFlightQuery, UserFlightQueryVariables>(UserFlightDocument, options);
        }
export type UserFlightQueryHookResult = ReturnType<typeof useUserFlightQuery>;
export type UserFlightLazyQueryHookResult = ReturnType<typeof useUserFlightLazyQuery>;
export type UserFlightSuspenseQueryHookResult = ReturnType<typeof useUserFlightSuspenseQuery>;
export type UserFlightQueryResult = Apollo.QueryResult<UserFlightQuery, UserFlightQueryVariables>;
export function refetchUserFlightQuery(variables: UserFlightQueryVariables) {
      return { query: UserFlightDocument, variables: variables }
    }
export const SyncUserDocument = gql`
    mutation SyncUser {
  syncUser
}
    `;
export type SyncUserMutationFn = Apollo.MutationFunction<SyncUserMutation, SyncUserMutationVariables>;

/**
 * __useSyncUserMutation__
 *
 * To run a mutation, you first call `useSyncUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSyncUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [syncUserMutation, { data, loading, error }] = useSyncUserMutation({
 *   variables: {
 *   },
 * });
 */
export function useSyncUserMutation(baseOptions?: Apollo.MutationHookOptions<SyncUserMutation, SyncUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SyncUserMutation, SyncUserMutationVariables>(SyncUserDocument, options);
      }
export type SyncUserMutationHookResult = ReturnType<typeof useSyncUserMutation>;
export type SyncUserMutationResult = Apollo.MutationResult<SyncUserMutation>;
export type SyncUserMutationOptions = Apollo.BaseMutationOptions<SyncUserMutation, SyncUserMutationVariables>;
export const DeleteUserDocument = gql`
    mutation DeleteUser {
  deleteUser
}
    `;
export type DeleteUserMutationFn = Apollo.MutationFunction<DeleteUserMutation, DeleteUserMutationVariables>;

/**
 * __useDeleteUserMutation__
 *
 * To run a mutation, you first call `useDeleteUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteUserMutation, { data, loading, error }] = useDeleteUserMutation({
 *   variables: {
 *   },
 * });
 */
export function useDeleteUserMutation(baseOptions?: Apollo.MutationHookOptions<DeleteUserMutation, DeleteUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteUserMutation, DeleteUserMutationVariables>(DeleteUserDocument, options);
      }
export type DeleteUserMutationHookResult = ReturnType<typeof useDeleteUserMutation>;
export type DeleteUserMutationResult = Apollo.MutationResult<DeleteUserMutation>;
export type DeleteUserMutationOptions = Apollo.BaseMutationOptions<DeleteUserMutation, DeleteUserMutationVariables>;
export const PreferenceDocument = gql`
    query Preference {
  userPreference {
    measurement
    dateFormat
  }
}
    `;

/**
 * __usePreferenceQuery__
 *
 * To run a query within a React component, call `usePreferenceQuery` and pass it any options that fit your needs.
 * When your component renders, `usePreferenceQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePreferenceQuery({
 *   variables: {
 *   },
 * });
 */
export function usePreferenceQuery(baseOptions?: Apollo.QueryHookOptions<PreferenceQuery, PreferenceQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PreferenceQuery, PreferenceQueryVariables>(PreferenceDocument, options);
      }
export function usePreferenceLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PreferenceQuery, PreferenceQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PreferenceQuery, PreferenceQueryVariables>(PreferenceDocument, options);
        }
export function usePreferenceSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<PreferenceQuery, PreferenceQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<PreferenceQuery, PreferenceQueryVariables>(PreferenceDocument, options);
        }
export type PreferenceQueryHookResult = ReturnType<typeof usePreferenceQuery>;
export type PreferenceLazyQueryHookResult = ReturnType<typeof usePreferenceLazyQuery>;
export type PreferenceSuspenseQueryHookResult = ReturnType<typeof usePreferenceSuspenseQuery>;
export type PreferenceQueryResult = Apollo.QueryResult<PreferenceQuery, PreferenceQueryVariables>;
export function refetchPreferenceQuery(variables?: PreferenceQueryVariables) {
      return { query: PreferenceDocument, variables: variables }
    }
export const UpdatePreferenceDocument = gql`
    mutation UpdatePreference($data: UpdateUserPreferenceInput!) {
  updateUserPreference(data: $data)
}
    `;
export type UpdatePreferenceMutationFn = Apollo.MutationFunction<UpdatePreferenceMutation, UpdatePreferenceMutationVariables>;

/**
 * __useUpdatePreferenceMutation__
 *
 * To run a mutation, you first call `useUpdatePreferenceMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdatePreferenceMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updatePreferenceMutation, { data, loading, error }] = useUpdatePreferenceMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdatePreferenceMutation(baseOptions?: Apollo.MutationHookOptions<UpdatePreferenceMutation, UpdatePreferenceMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdatePreferenceMutation, UpdatePreferenceMutationVariables>(UpdatePreferenceDocument, options);
      }
export type UpdatePreferenceMutationHookResult = ReturnType<typeof useUpdatePreferenceMutation>;
export type UpdatePreferenceMutationResult = Apollo.MutationResult<UpdatePreferenceMutation>;
export type UpdatePreferenceMutationOptions = Apollo.BaseMutationOptions<UpdatePreferenceMutation, UpdatePreferenceMutationVariables>;
export const IsInWaitListDocument = gql`
    query IsInWaitList($feature: String!) {
  userIsInWaitList(feature: $feature)
}
    `;

/**
 * __useIsInWaitListQuery__
 *
 * To run a query within a React component, call `useIsInWaitListQuery` and pass it any options that fit your needs.
 * When your component renders, `useIsInWaitListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useIsInWaitListQuery({
 *   variables: {
 *      feature: // value for 'feature'
 *   },
 * });
 */
export function useIsInWaitListQuery(baseOptions: Apollo.QueryHookOptions<IsInWaitListQuery, IsInWaitListQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<IsInWaitListQuery, IsInWaitListQueryVariables>(IsInWaitListDocument, options);
      }
export function useIsInWaitListLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<IsInWaitListQuery, IsInWaitListQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<IsInWaitListQuery, IsInWaitListQueryVariables>(IsInWaitListDocument, options);
        }
export function useIsInWaitListSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<IsInWaitListQuery, IsInWaitListQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<IsInWaitListQuery, IsInWaitListQueryVariables>(IsInWaitListDocument, options);
        }
export type IsInWaitListQueryHookResult = ReturnType<typeof useIsInWaitListQuery>;
export type IsInWaitListLazyQueryHookResult = ReturnType<typeof useIsInWaitListLazyQuery>;
export type IsInWaitListSuspenseQueryHookResult = ReturnType<typeof useIsInWaitListSuspenseQuery>;
export type IsInWaitListQueryResult = Apollo.QueryResult<IsInWaitListQuery, IsInWaitListQueryVariables>;
export function refetchIsInWaitListQuery(variables: IsInWaitListQueryVariables) {
      return { query: IsInWaitListDocument, variables: variables }
    }
export const AddToWaitListDocument = gql`
    mutation AddToWaitList($feature: String!) {
  addToWaitList(feature: $feature)
}
    `;
export type AddToWaitListMutationFn = Apollo.MutationFunction<AddToWaitListMutation, AddToWaitListMutationVariables>;

/**
 * __useAddToWaitListMutation__
 *
 * To run a mutation, you first call `useAddToWaitListMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddToWaitListMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addToWaitListMutation, { data, loading, error }] = useAddToWaitListMutation({
 *   variables: {
 *      feature: // value for 'feature'
 *   },
 * });
 */
export function useAddToWaitListMutation(baseOptions?: Apollo.MutationHookOptions<AddToWaitListMutation, AddToWaitListMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddToWaitListMutation, AddToWaitListMutationVariables>(AddToWaitListDocument, options);
      }
export type AddToWaitListMutationHookResult = ReturnType<typeof useAddToWaitListMutation>;
export type AddToWaitListMutationResult = Apollo.MutationResult<AddToWaitListMutation>;
export type AddToWaitListMutationOptions = Apollo.BaseMutationOptions<AddToWaitListMutation, AddToWaitListMutationVariables>;
export const RemoveFromWaitListDocument = gql`
    mutation RemoveFromWaitList($feature: String!) {
  removeFromWaitList(feature: $feature)
}
    `;
export type RemoveFromWaitListMutationFn = Apollo.MutationFunction<RemoveFromWaitListMutation, RemoveFromWaitListMutationVariables>;

/**
 * __useRemoveFromWaitListMutation__
 *
 * To run a mutation, you first call `useRemoveFromWaitListMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveFromWaitListMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeFromWaitListMutation, { data, loading, error }] = useRemoveFromWaitListMutation({
 *   variables: {
 *      feature: // value for 'feature'
 *   },
 * });
 */
export function useRemoveFromWaitListMutation(baseOptions?: Apollo.MutationHookOptions<RemoveFromWaitListMutation, RemoveFromWaitListMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveFromWaitListMutation, RemoveFromWaitListMutationVariables>(RemoveFromWaitListDocument, options);
      }
export type RemoveFromWaitListMutationHookResult = ReturnType<typeof useRemoveFromWaitListMutation>;
export type RemoveFromWaitListMutationResult = Apollo.MutationResult<RemoveFromWaitListMutation>;
export type RemoveFromWaitListMutationOptions = Apollo.BaseMutationOptions<RemoveFromWaitListMutation, RemoveFromWaitListMutationVariables>;