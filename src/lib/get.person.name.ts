import { compact } from 'lodash';

/**
 * "Given a person object with firstName and lastName properties, return the person's full name or just
 * their first name."
 *
 * The first argument is a person object with firstName and lastName properties. The second argument is
 * a boolean that determines whether to return the person's full name or just their first name
 * @param person - { firstName: string, lastName: string }
 * @param {boolean} [fullName] - This is an optional parameter. If it's not passed in, it will default
 * to false.
 * @returns A string
 */
export function getPersonName(
  person: { firstName?: null | string; lastName?: null | string },
  fullName?: boolean,
) {
  return compact([
    person.firstName,
    fullName ? person.lastName : person.lastName?.[0],
  ]).join(' ');
}
