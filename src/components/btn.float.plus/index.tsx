import * as React from 'react';

import { useTheme } from '@app/lib/hooks/use.theme';

import { FloatBtn } from '../btn.float';
import { FaIcon } from '../icons.fontawesome';

type Props = Omit<React.ComponentProps<typeof FloatBtn>, 'children'>;

export const FloatingPlusBtn: React.FC<Props> = (props) => {
  const theme = useTheme();
  return (
    <FloatBtn {...props}>
      <FaIcon color={theme.pallette.white} name="plus" size={30} />
    </FloatBtn>
  );
};
