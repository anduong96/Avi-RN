import * as React from 'react';

import { IconBtn } from '../icon.btn';

export type Props = Omit<React.ComponentProps<typeof IconBtn>, 'icon'>;
export const BackBtn: React.FC<Props> = ({ size = 20, ...props }) => {
  return <IconBtn icon="chevron-left" size={size} {...props} />;
};
