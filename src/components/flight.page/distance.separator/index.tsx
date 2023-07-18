import * as React from 'react';

import { Text, View } from 'react-native';

import DashedLine from 'react-native-dashed-line';
import moment from 'moment';
import { styled } from '@app/lib/styled';
import { useTheme } from '@app/lib/hooks/use.theme';

type Props = {
  duration: number;
};

export const FlightPageDistanceSeparator: React.FC<Props> = ({ duration }) => {
  const theme = useTheme();

  return (
    <Container>
      <DashedLine
        dashLength={2}
        dashColor={theme.pallette.grey[200]}
        style={{
          position: 'absolute',
          top: '50%',
        }}
      />
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
