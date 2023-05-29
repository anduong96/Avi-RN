import * as React from 'react';

import { Actions, Container, Meta, SubtitleText, TitleText } from './styles';

import { CloseBtn } from '../btn.close';
import type { StringOrElement } from '@app/types/string.or.component';
import { StringRenderer } from '../string.renderer';
import { useNavigation } from '@react-navigation/native';

type Props = {
  withClose?: boolean;
  title?: StringOrElement;
  subtitle?: StringOrElement;
  onClose?: () => void;
  withTopInset?: boolean;
};

export const ModalHeader: React.FC<Props> = ({
  withClose = true,
  withTopInset = false,
  title,
  subtitle,
  onClose,
}) => {
  const navigation = useNavigation();

  const handleClose = () => {
    if (onClose) {
      onClose?.();
    } else if (navigation.canGoBack()) {
      navigation.goBack();
    }
  };

  return (
    <Container withTopInset={withTopInset}>
      <Meta>
        <StringRenderer value={title} Container={TitleText} />
        <StringRenderer value={subtitle} Container={SubtitleText} />
      </Meta>
      <Actions>{withClose && <CloseBtn onPress={handleClose} />}</Actions>
    </Container>
  );
};
