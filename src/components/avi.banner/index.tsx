import * as React from 'react';

import { Content, LogoContainer, LogoText, StyledLogo } from './styles';
import type { StyleProp, ViewStyle } from 'react-native';

import Animated from 'react-native-reanimated';
import { Card } from '../card';
import { TagStatus } from '../tag.status';
import { View } from 'react-native';

type Props = {
  style?: StyleProp<ViewStyle>;
};

export const AviBanner: React.FC<Props> = ({ style }) => {
  return (
    <Card hasShadow style={[style]}>
      <Animated.View>
        <Content>
          <LogoContainer>
            <StyledLogo />
            <LogoText>Includes</LogoText>
          </LogoContainer>
          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              columnGap: 20,
              rowGap: 10,
              paddingTop: 20,
            }}
          >
            <TagStatus size={15} value={true}>
              Automated check-in
            </TagStatus>
            <TagStatus size={15} value={true}>
              Flight concierge
            </TagStatus>
            <TagStatus size={15} value={true}>
              Incident compensation
            </TagStatus>
            <TagStatus size={15} value={true}>
              Real-time updates
            </TagStatus>
          </View>
        </Content>
      </Animated.View>
    </Card>
  );
};
