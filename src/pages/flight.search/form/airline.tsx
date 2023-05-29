import * as React from 'react';

import { DisplayText } from './styles';

type Props = {
  value?: string;
};

export const AirlineFormItem: React.FC<Props> = ({ value }) => {
  if (!value) {
    return <DisplayText>Airline</DisplayText>;
  }

  return <DisplayText hasValue>{value}</DisplayText>;
};
