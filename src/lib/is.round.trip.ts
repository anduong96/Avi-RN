/**
 * It returns true if the given array of slices has two elements, and the origin of the first slice is
 * the same as the destination of the second slice
 * @param slices - Array<Pick<FlightOfferSlice, 'originIata' | 'destinationIata'>>
 * @returns A boolean value
 */
export function isRoundtrip(slices: Array<unknown>) {
  //TODO: this need to be better
  return slices.length === 2;
}
