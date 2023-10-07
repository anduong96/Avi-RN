import { parseFlightIata } from '../parse.flight.iata';

describe('lib:parseFlightIata', () => {
  it('parses AA100', () => {
    const result = parseFlightIata('AA100');
    expect(result).toBeTruthy();
    expect(result!.iata).toBe('AA');
    expect(result!.flightNumber).toBe('100');
  });
});
