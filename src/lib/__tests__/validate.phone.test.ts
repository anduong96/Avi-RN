import { isE164PhoneNumber } from '../validators/validate.phone';

describe('isE164PhoneNumber', () => {
  test('returns true for valid E.164 phone numbers', () => {
    expect(isE164PhoneNumber('+14155552671')).toBe(true);
    expect(isE164PhoneNumber('+447911123456')).toBe(true);
    expect(isE164PhoneNumber('+972541234567')).toBe(true);
    expect(isE164PhoneNumber('+12487123456')).toBe(true);
    expect(isE164PhoneNumber('+61412345678')).toBe(true);
  });

  test('returns false for invalid phone numbers', () => {
    expect(isE164PhoneNumber('')).toBe(false);
    expect(isE164PhoneNumber('+')).toBe(false);
    expect(isE164PhoneNumber('1234567890')).toBe(false);
    expect(isE164PhoneNumber('14155552671')).toBe(false);
    expect(isE164PhoneNumber('+141555526710')).toBe(false);
    expect(isE164PhoneNumber('+1-415-555-2671')).toBe(false);
    expect(isE164PhoneNumber('+1.415.555.2671')).toBe(false);
    expect(isE164PhoneNumber('+1 (415) 555-2671')).toBe(false);
  });
});
