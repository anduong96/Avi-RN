import * as React from 'react';

import { FloatBtn } from '../btn.float';
import { MaterialIcon } from '../material.icons';
import { useTheme } from '@app/lib/hooks/use.theme';

type Props = Omit<React.ComponentProps<typeof FloatBtn>, 'children'>;

export const FloatingPlusBtn: React.FC<Props> = (props) => {
  const theme = useTheme();
  return (
    <FloatBtn {...props}>
      <MaterialIcon name="plus" size={30} color={theme.pallette.white} />
    </FloatBtn>
  );
};
