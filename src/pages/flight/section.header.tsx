import * as React from 'react';
import { View } from 'react-native';

import { withStyled } from '@app/lib/styled';
import { Group } from '@app/components/group';
import { Typography } from '@app/components/typography';
import { FaIcon } from '@app/components/icons.fontawesome';

import type { FlightSectionEnum } from './constants';

import { FlightSection } from './constants';
import { useSectionColor } from './hooks/use.section.color';

type Props = {
  section: Exclude<FlightSectionEnum, FlightSectionEnum.META>;
};

export const SectionHeader: React.FC<Props> = ({ section }) => {
  const getSectionColor = useSectionColor();
  const color = getSectionColor(section);
  const entry = FlightSection[section];

  return (
    <Group
      direction="row"
      gap="medium"
      paddingHorizontal={'medium'}
      verticalAlign="center"
    >
      <SectionIcon>
        <FaIcon color={color} name={entry.icon} size={15} />
      </SectionIcon>
      <Typography isBold type="h1">
        {entry.label}
      </Typography>
    </Group>
  );
};

const SectionIcon = withStyled(View, (theme) => [
  theme.presets.centered,
  {
    aspectRatio: 1,
    backgroundColor: theme.pallette.card,
    borderRadius: theme.borderRadius,
    padding: theme.space.small,
  },
]);
