import { PhoneNumberUtil } from 'google-libphonenumber';
import { tryNice } from 'try-nice';

/**
 * The function parses a phone number string and returns an object with the country code and national
 * number.
 * @param {string} value - A string representing a phone number in any format.
 * @returns The `parsePhone` function returns an object with `countryCode` and `nationalNumber`
 * properties. If the input `value` is falsy, an empty object is returned. If the input `value` is a
 * valid phone number, the `countryCode` and `nationalNumber` properties are extracted from the parsed
 * phone number and returned in an object. If the input `value` is
 */
export function parsePhone(value?: string) {
  if (!value) {
    return {};
  }

  const phoneUtil = PhoneNumberUtil.getInstance();
  const [parsed] = tryNice(() => phoneUtil.parse(value));
  if (!parsed) {
    return {};
  }

  const countryCode = parsed.getCountryCode()?.toString();
  const nationalNumber = parsed.getNationalNumber()?.toString();
  return {
    countryCode,
    nationalNumber,
  };
}
