import * as React from 'react';

import { useFlightPushSub } from '@app/lib/hooks/use.flight.push.sub';

export const BackgroundProcesses: React.FC = () => {
  useFlightPushSub();

  return <></>;
};
