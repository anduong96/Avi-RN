import * as React from 'react';

import { logger } from '.';

export function useLogger(name: string | string[]) {
  return React.useMemo(() => logger.getSubLogger(name), [name]);
}
