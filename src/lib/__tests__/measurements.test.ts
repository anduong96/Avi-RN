import { kmToMi } from '../measurement/km.to.mi';

describe('lib::measurements', () => {
  it('should convert kilometers to miles', () => {
    expect(kmToMi(1)).toBe(0.621371);
    expect(kmToMi(100)).toBe(62.1371);
    expect(kmToMi(1000)).toBe(621.371);
    expect(kmToMi(10000)).toBe(621.371);
    expect(kmToMi(100000)).toBe(621.371);
    expect(kmToMi(0)).toBe(0);
  });
});
