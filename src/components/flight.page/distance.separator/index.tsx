import * as React from 'react';

import { Text, View } from 'react-native';

import { DividerDashed } from '@app/components/divider.dashed';
import moment from 'moment';
import { styled } from '@app/lib/styled';

type Props = {
  duration: number;
};

export const FlightPageDistanceSeparator: React.FC<Props> = ({ duration }) => {
  return (
    <Container>
      <Divider />
      <Content>
        <TextContainer>
          <StyledText>
            {moment
              .utc(duration)
              .format('H[h] m[m]')
              .split(' ')
              .filter((item) => !item.startsWith('0'))
              .join(' ')}
          </StyledText>
        </TextContainer>
      </Content>
    </Container>
  );
};

const Container = styled(View, (theme) => [theme.presets.centered]);

const Content = styled(View, (theme) => [theme.presets.centered]);

const Divider = styled(DividerDashed, () => [
  {
    width: '100%',
    position: 'absolute',
    alignSelf: 'center',
  },
]);

const TextContainer = styled(View, (theme) => [
  theme.presets.centered,
  {
    backgroundColor: theme.pallette.grey[100],
    paddingHorizontal: theme.space.medium,
    paddingVertical: 2,
    borderRadius: theme.borderRadius,
    gap: theme.space.tiny,
    flexDirection: 'row',
  },
]);

const StyledText = styled(Text, (theme) => [
  theme.typography.presets.p1,
  {
    color: theme.pallette.grey[800],
    fontWeight: 'bold',
  },
]);
