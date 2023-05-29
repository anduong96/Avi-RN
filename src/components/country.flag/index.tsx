import * as React from 'react';

import { ImageType } from '@app/generated/server.gql';
import { SvgUri } from 'react-native-svg';
import { View } from 'react-native';
import { styled } from '@app/lib/styled';

type Props = {
  imageUri: string;
  type: ImageType;
};

const Container = styled(View, {
  borderRadius: 3,
  overflow: 'hidden',
});

export const CountryFlag: React.FC<Props> = ({ imageUri, type }) => {
  if (type === ImageType.PNG) {
    return null;
  }

  return (
    <Container>
      <SvgUri width={30} height={30} uri={imageUri} />
    </Container>
  );
};
