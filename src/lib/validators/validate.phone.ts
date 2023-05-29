/**
 * It returns true if the phone number is in E.164 format, and false if it's not
 * @param {string} phoneNumber - The phone number to validate.
 * @returns A boolean value
 */
export function isE164PhoneNumber(phoneNumber: string) {
  const regEx = /^\+[1-9]\d{5,14}$/;
  return regEx.test(phoneNumber);
}
