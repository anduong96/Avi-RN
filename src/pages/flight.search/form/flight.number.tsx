import * as React from 'react';

import { DisplayText } from './styles';

type Props = {
  value?: string;
};

export const FlightNumberFormItem: React.FC<Props> = ({ value }) => {
  if (!value) {
    return <DisplayText>flight number</DisplayText>;
  }

  return <DisplayText hasValue>{value}</DisplayText>;
};
