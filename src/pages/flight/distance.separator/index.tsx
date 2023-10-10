import * as React from 'react';
import { Text, View } from 'react-native';

import moment from 'moment';

import { styled } from '@app/lib/styled';
import { DividerDashed } from '@app/components/divider.dashed';

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
    alignSelf: 'center',
    position: 'absolute',
    width: '100%',
  },
]);

const TextContainer = styled(View, (theme) => [
  theme.presets.centered,
  {
    backgroundColor: theme.pallette.borderColor,
    borderRadius: theme.borderRadius,
    flexDirection: 'row',
    gap: theme.space.tiny,
    paddingHorizontal: theme.space.medium,
    paddingVertical: 2,
  },
]);

const StyledText = styled(Text, (theme) => [
  theme.typography.presets.p1,
  {
    fontWeight: 'bold',
  },
]);
