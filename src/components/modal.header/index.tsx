import * as React from 'react';
import { Text, View } from 'react-native';

import type { StringOrElement } from '@app/types/string.or.component';

import { styled } from '@app/lib/styled';
import { useExitPage } from '@app/lib/hooks/use.exit.page';

import { CloseBtn } from '../btn.close';
import { StringRenderer } from '../string.renderer';

type Props = {
  onClose?: () => void;
  subtitle?: StringOrElement;
  title?: StringOrElement;
  withClose?: boolean;
  withPadding?: boolean;
  withTopInset?: boolean;
};

export const ModalHeader: React.FC<Props> = ({
  onClose,
  subtitle,
  title,
  withClose = true,
  withPadding = true,
  withTopInset = false,
}) => {
  const exit = useExitPage();

  return (
    <Container withTopInset={withTopInset}>
      <Meta withPadding={withPadding}>
        <StringRenderer Container={TitleText}>{title}</StringRenderer>
        <StringRenderer Container={SubtitleText}>{subtitle}</StringRenderer>
      </Meta>
      <Actions>{withClose && <CloseBtn onPress={onClose ?? exit} />}</Actions>
    </Container>
  );
};

const Container = styled<Pick<Props, 'withTopInset'>, typeof View>(
  View,
  (theme, props) => [
    {
      backgroundColor: theme.pallette.background,
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingTop: theme.space.medium,
      zIndex: 1,
    },
    props.withTopInset && {
      paddingTop: theme.insets.top,
    },
  ],
);

const Meta = styled<Pick<Props, 'withPadding'>, typeof View>(
  View,
  (theme, props) => [
    {
      flexGrow: 1,
      paddingTop: 0,
    },
    props.withPadding && {
      padding: theme.space.medium,
    },
  ],
);

const TitleText = styled(Text, (theme) => ({
  ...theme.typography.presets.h2,
  fontWeight: 'bold',
}));

const SubtitleText = styled(Text, (theme) => ({
  color: theme.pallette.grey[500],
}));

const Actions = styled(View, (theme) => ({
  padding: theme.space.medium,
  paddingTop: 0,
}));
