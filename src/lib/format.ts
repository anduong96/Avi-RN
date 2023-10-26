/**
 * The `format` function takes a string and replaces placeholders with corresponding values from the
 * arguments array.
 * @param {string} value - The `value` parameter is a string that contains placeholders for values to
 * be formatted. The placeholders are represented by `%s`, `%d`, `%i`, `%f`, `%o`, `%j`.
 * @param {unknown[]} args - The `args` parameter is a rest parameter that allows you to pass in an
 * arbitrary number of arguments to the `format` function. These arguments can be of any type.
 * @returns The function `format` returns a formatted string.
 */
export function format(value: string, ...args: unknown[]): string {
  let i = 0;
  return value.replace(/%[sdifoOjJ]/g, (match) => {
    if (i >= args.length) {
      return match;
    }

    const arg = args[i++];

    switch (match) {
      case '%s':
        return String(arg);
      case '%d':
      case '%i':
      case '%f':
        return Number(arg).toString();
      case '%o':
        return JSON.stringify(arg);
      case '%j':
        try {
          return JSON.stringify(arg, null, 2);
        } catch (e) {
          return `[Circular]`;
        }
    }

    return match;
  });
}
