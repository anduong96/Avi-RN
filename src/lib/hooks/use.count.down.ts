import * as React from 'react';

const hourMs = 60 * 60 * 1000;
const minuteMs = 60 * 1000;
const secondMs = 1000;

export function useCountDown(timeMs: number) {
  const [timeLeft, setTimeLeft] = React.useState(timeMs);

  React.useEffect(() => {
    setTimeLeft(timeMs);
    const intervalMs = timeMs > hourMs ? minuteMs : secondMs;

    const intervalID = setInterval(() => {
      setTimeLeft((current) => (current <= 0 ? 0 : current - 1000));
    }, intervalMs);

    return () => {
      clearInterval(intervalID);
    };
  }, [timeMs]);

  return timeLeft;
}
