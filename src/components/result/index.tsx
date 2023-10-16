import type { StyleProp, ViewStyle } from 'react-native';

import * as React from 'react';
import { Text, View } from 'react-native';

import { isEmpty } from 'lodash';

import type { StringOrElement } from '@app/types/string.or.component';

import { styled } from '@app/lib/styled';

import { Button } from '../button';
import { StringRenderer } from '../string.renderer';

type Props = {
  actions?: Array<React.ComponentProps<typeof Button> | React.ReactElement>;
  hero?: React.ReactElement;
  style?: StyleProp<ViewStyle>;
  subtitle?: StringOrElement;
  title?: StringOrElement;
};

export const Result: React.FC<Props> = ({
  actions,
  hero,
  style,
  subtitle,
  title,
}) => {
  return (
    <Container style={[style]}>
      {hero && <Hero>{hero}</Hero>}
      <Content>
        <Meta>
          {title && (
            <StringRenderer Container={TitleText}>{title}</StringRenderer>
          )}
          {subtitle && (
            <StringRenderer Container={SubtitleText}>{subtitle}</StringRenderer>
          )}
        </Meta>
        {!isEmpty(actions) && (
          <Actions>
            {actions?.map((item, index) =>
              React.isValidElement(item) ? (
                React.cloneElement(item, { key: index })
              ) : (
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-expect-error
                <ActionItem key={index} {...item} />
              ),
            )}
          </Actions>
        )}
      </Content>
    </Container>
  );
};

const Container = styled(View, (theme) => [
  theme.presets.centered,
  {
    gap: theme.space.medium,
    height: '100%',
    padding: theme.space.medium,
  },
]);

const Meta = styled(View, (theme) => ({
  gap: theme.space.small,
}));

const Actions = styled(View, (theme) => [
  theme.presets.centered,
  {
    gap: theme.space.medium,
    marginTop: theme.space.large,
  },
]);

const TitleText = styled(Text, (theme) => [
  theme.typography.presets.h1,
  {
    fontWeight: 'bold',
    lineHeight: 30,
    textAlign: 'center',
  },
]);

const SubtitleText = styled(Text, (theme) => [
  theme.typography.presets.p1,
  {
    color: theme.pallette.textSecondary,
    textAlign: 'center',
  },
]);

const ActionItem = styled(Button, () => ({}));

const Hero = styled(View, (theme) => [
  theme.presets.centered,
  {
    flexBasis: 1,
    flexGrow: 1,
    padding: theme.space.medium,
  },
]);

const Content = styled(View, () => [
  {
    flexBasis: 1,
    flexGrow: 1,
  },
]);
