import * as React from 'react';

import { Content } from './styles';
import { ModalHeader } from '../modal.header';
import type { ModalProps } from 'react-native';
import { Modal as RnModal } from 'react-native';
import type { StringOrElement } from '@app/types/string.or.component';

type Props = {
  withCloseBtn?: boolean;
  children: React.ReactElement | Array<React.ReactElement | false>;
  title?: StringOrElement;
  subtitle?: StringOrElement;
  onClose?: () => void;
  external?: React.ReactElement;
} & Omit<ModalProps, 'onRequestClose'>;

export const Modal: React.FC<Props> = ({
  title,
  subtitle,
  children,
  external,
  onClose,
  ...props
}) => {
  return (
    <RnModal
      {...props}
      onRequestClose={onClose}
      presentationStyle="pageSheet"
      animationType="slide"
    >
      <ModalHeader
        title={title}
        subtitle={subtitle}
        onClose={() => onClose?.()}
      />
      <Content>{children}</Content>
      {external}
    </RnModal>
  );
};
