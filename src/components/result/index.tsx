import * as React from 'react';

import {
  ActionItem,
  Actions,
  Container,
  Content,
  Hero,
  Meta,
  SubtitleText,
  TitleText,
} from './styles';
import type { StyleProp, ViewStyle } from 'react-native';

import type { Button } from '../button';
import type { StringOrElement } from '@app/types/string.or.component';
import { StringRenderer } from '../string.renderer';
import { isEmpty } from 'lodash';

type Props = {
  title?: StringOrElement;
  subtitle?: StringOrElement;
  actions?: Array<React.ReactElement | React.ComponentProps<typeof Button>>;
  style?: StyleProp<ViewStyle>;
  hero?: React.ReactElement;
};

export const Result: React.FC<Props> = ({
  title,
  subtitle,
  actions,
  style,
  hero,
}) => {
  return (
    <Container style={[style]}>
      {hero && <Hero>{hero}</Hero>}
      <Content>
        <Meta>
          {title && <StringRenderer value={title} Container={TitleText} />}
          {subtitle && (
            <StringRenderer value={subtitle} Container={SubtitleText} />
          )}
        </Meta>
        {!isEmpty(actions) && (
          <Actions>
            {actions?.map((item, index) =>
              React.isValidElement(item) ? (
                React.cloneElement(item, { key: index })
              ) : (
                //@ts-ignore
                <ActionItem key={index} {...item} />
              ),
            )}
          </Actions>
        )}
      </Content>
    </Container>
  );
};
