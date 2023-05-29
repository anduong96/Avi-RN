import { formatMillisToDuration } from '../format.milis.to.duration';

describe('lib::formatMillisToDuration', () => {
  it('should return "0s" for 0 milliseconds', () => {
    expect(formatMillisToDuration(0)).toBe('0s');
  });

  it('should return duration in hours, minutes and seconds', () => {
    expect(formatMillisToDuration(123456789)).toBe('34h 17m 36s');
    expect(formatMillisToDuration(3600000)).toBe('1h');
    expect(formatMillisToDuration(60000)).toBe('1m');
    expect(formatMillisToDuration(1000)).toBe('1s');
    expect(formatMillisToDuration(45678)).toBe('12h 41m 18s');
  });
});
