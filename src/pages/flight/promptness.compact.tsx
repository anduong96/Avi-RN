import * as React from 'react';

import { Text, View } from 'react-native';

import { FaIcon } from '@app/components/icons.fontawesome';
import type { GetFlightQuery } from '@app/generated/server.gql';
import { VerticalDivider } from '@app/components/divider.vertical';
import moment from 'moment';
import { styled } from '@app/lib/styled';

type Props = {
  value: GetFlightQuery['flight']['promptness'];
};

export const PromptnessCompact: React.FC<Props> = ({ value }) => {
  return (
    <Container>
      <Content>
        <Item>
          <ItemTitle>Delay Chance</ItemTitle>
          <ItemValue>{100 - value.onTimePercent}%</ItemValue>
        </Item>
        <VerticalDivider />
        <Item>
          <ItemTitle>Delay Average</ItemTitle>
          <ItemValue>
            {moment.duration(value.averageDelayTime).minutes()} min
          </ItemValue>
        </Item>
      </Content>
      <Footer>
        <FaIcon isActive name="chevron-right" />
      </Footer>
    </Container>
  );
};

const Container = styled(View, (theme) => [
  theme.presets.shadows[100],
  theme.presets.centered,
  {
    padding: theme.space.medium,
    borderRadius: theme.borderRadius,
    backgroundColor: theme.pallette.background,
    gap: theme.space.small,
  },
]);

const Item = styled(View, (theme) => [
  theme.presets.centered,
  {
    flexGrow: 1,
    flexBasis: 1,
    gap: theme.space.small,
  },
]);

const ItemTitle = styled(Text, (theme) => [
  theme.typography.presets.p1,
  {
    color: theme.pallette.grey[700],
  },
]);

const ItemValue = styled(Text, (theme) => [
  theme.pallette,
  theme.typography.presets.h1,
]);

const Content = styled(View, () => [
  {
    flexDirection: 'row',
  },
]);

const Footer = styled(View, () => [
  {
    alignItems: 'flex-end',
    width: '100%',
  },
]);
