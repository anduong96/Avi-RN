import * as React from 'react';
import { View } from 'react-native';

import type { StringOrElement } from '@app/types/string.or.component';

import { withStyled } from '@app/lib/styled';
import { useExitPage } from '@app/lib/hooks/use.exit.page';

import { CloseBtn } from '../btn.close';
import { Typography } from '../typography';
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
}) => {
  const exit = useExitPage();

  return (
    <Container>
      <Meta withPadding={withPadding}>
        <StringRenderer Container={Typography} isBold type="h3">
          {title}
        </StringRenderer>
        <StringRenderer Container={Typography}>{subtitle}</StringRenderer>
      </Meta>
      <Actions>{withClose && <CloseBtn onPress={onClose ?? exit} />}</Actions>
    </Container>
  );
};

const Container = withStyled<Pick<Props, 'withTopInset'>, typeof View>(
  View,
  (theme, props) => [
    {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingTop: theme.space.medium,
    },
    props.withTopInset && {
      paddingTop: theme.insets.top,
    },
  ],
);

const Meta = withStyled<Pick<Props, 'withPadding'>, typeof View>(
  View,
  (theme, props) => [
    {
      flexGrow: 1,
      gap: theme.space.tiny,
      paddingTop: 0,
    },
    props.withPadding && {
      padding: theme.space.medium,
    },
  ],
);

const Actions = withStyled(View, (theme) => ({
  padding: theme.space.medium,
  paddingTop: 0,
}));
