import * as React from 'react';

import { DisplayText } from './styles';

type Props = {
  value?: Date;
};

export const DepartureDateFormItem: React.FC<Props> = ({ value }) => {
  if (!value) {
    return <DisplayText>departure date</DisplayText>;
  }

  return <DisplayText hasValue>{value.toString()}</DisplayText>;
};
