import tinycolor from 'tinycolor2';
import seedRandom from 'seed-random';

const getColor = (seed: string) => {
  const random = seedRandom(seed);
  const r = Math.floor(random() * 256);
  const g = Math.floor(random() * 256);
  const b = Math.floor(random() * 256);
  return tinycolor({ b, g, r });
};

/**
 * The `generateColors` function takes a seed string and generates two color codes, one neon and one
 * pastel, based on the hash value of the seed.
 * @param {string} seed - The `seed` parameter is a string that is used to generate random colors. It
 * can be any string value that you want to use as the seed for generating colors.
 * @returns The function `generateColors` returns an object with two properties: `neon` and `pastel`.
 */
export function generateColors(seed: string): { neon: string; pastel: string } {
  const neon = getColor(seed).saturate();
  const pastel = neon.clone().complement();

  return {
    neon: neon.toHexString(),
    pastel: pastel.toHexString(),
  };
}
