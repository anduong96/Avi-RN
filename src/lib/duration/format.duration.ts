import humanizeDuration from 'humanize-duration';

const shortEnglishHumanizer = humanizeDuration.humanizer({
  languages: {
    enShort: {
      d: () => 'd',
      h: () => 'h',
      m: () => 'm',
      mo: () => 'mo',
      ms: () => 'ms',
      s: () => 's',
      w: () => 'w',
      y: () => 'y',
    },
  },
});

export function formatDurationMs(ms: number): string {
  return shortEnglishHumanizer(ms, {
    delimiter: ' ',
    language: 'enShort',
    largest: 2,
    round: true,
    spacer: '',
  });
}
