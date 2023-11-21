import * as React from 'react';

import { logger } from '.';

export function useLogger(name: string) {
  return React.useMemo(() => logger.extend(name), [name]);
}
