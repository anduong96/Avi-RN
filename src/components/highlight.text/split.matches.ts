import type Fuse from 'fuse.js';

type Entry = {
  isMatch: boolean;
  text: string;
};

export function splitMatches(params: {
  matchKey: string;
  matches: readonly Fuse.FuseResultMatch[];
  text: string;
}) {
  let lastIndex = 0;
  const result: Entry[] = [];

  for (const match of params.matches) {
    if (match.key !== params.matchKey) {
      continue;
    }

    for (const [startIndex, endIndex] of match.indices) {
      result.push({
        isMatch: false,
        text: params.text.substring(lastIndex, startIndex),
      });

      result.push({
        isMatch: true,
        text: params.text.substring(startIndex, endIndex + 1),
      });

      lastIndex = endIndex + 1;
    }
  }

  if (lastIndex < params.text.length) {
    result.push({
      isMatch: false,
      text: params.text.substring(lastIndex),
    });
  }

  return result;
}
