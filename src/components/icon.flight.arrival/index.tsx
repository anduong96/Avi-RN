import * as React from 'react';

import { FaIcon } from '../icons.fontawesome';

type Props = {
  color?: string;
  size?: number;
};
export const FlightArrivalIcon: React.FC<Props> = ({ color, size = 25 }) => {
  return <FaIcon color={color} name="circle-arrow-down-right" size={size} />;
};
