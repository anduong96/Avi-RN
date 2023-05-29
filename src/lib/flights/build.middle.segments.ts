import type { GeneralFlightSegmentFragment } from '@app/generated/server.gql';

type Params = {
  segments: Array<
    Pick<
      GeneralFlightSegmentFragment,
      | 'arrivalDate'
      | 'departureDate'
      | 'originIata'
      | 'destinationIata'
      | 'stops'
    >
  >;
};

type ResultItem = {
  iata: string;
  stops: GeneralFlightSegmentFragment['stops'];
};

/**
 * It takes an array of segments and returns an array of middle segments
 * @param {Params} params - Params
 * @returns An array of objects with the following properties:
 *   iata: string
 *   stops: number
 */
export function buildMiddleSegments(
  segments: Params['segments'],
): ResultItem[] {
  const result: ResultItem[] = [];

  segments.forEach((segment, index) => {
    if (index === 0) {
      return;
    }

    result.push({
      iata: segment.originIata,
      stops: segment.stops,
    });
  });

  return result;
}
