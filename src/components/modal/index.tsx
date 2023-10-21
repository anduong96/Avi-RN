import type { ModalProps } from 'react-native';

import * as React from 'react';
import { Modal as RnModal, View } from 'react-native';

import type { StringOrElement } from '@app/types/string.or.component';

import { withStyled } from '../../lib/styled';
import { ModalHeader } from '../modal.header';

type Props = {
  children: Array<React.ReactElement | false> | React.ReactElement;
  external?: React.ReactElement;
  onClose?: () => void;
  subtitle?: StringOrElement;
  title?: StringOrElement;
  withCloseBtn?: boolean;
} & Omit<ModalProps, 'onRequestClose'>;

export const Modal: React.FC<Props> = ({
  children,
  external,
  onClose,
  subtitle,
  title,
  ...props
}) => {
  return (
    <RnModal
      {...props}
      animationType="slide"
      onRequestClose={onClose}
      presentationStyle="pageSheet"
    >
      <ModalHeader
        onClose={() => onClose?.()}
        subtitle={subtitle}
        title={title}
      />
      <Content>{children}</Content>
      {external}
    </RnModal>
  );
};

export const Content = withStyled(View, {
  flexGrow: 1,
});
