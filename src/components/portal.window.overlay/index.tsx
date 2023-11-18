import * as React from 'react';
import { FullWindowOverlay } from 'react-native-screens';

import { IS_ANDROID } from '@app/lib/platform';

export const PortalWindowOverlay: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  if (IS_ANDROID) {
    return children;
  }

  return <FullWindowOverlay>{children}</FullWindowOverlay>;
};
