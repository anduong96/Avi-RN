import type BottomSheet from '@gorhom/bottom-sheet';

import * as React from 'react';
import { Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import {
  BottomSheetFooter,
  BottomSheetModal,
  BottomSheetView,
} from '@gorhom/bottom-sheet';

import { Backdrop } from './backdrop';
import { styled } from '../../lib/styled';

type Props = {
  children: React.ReactElement | React.ReactElement[];
  footer?: React.ReactElement;
  height?: number | string;
  title?: React.ReactElement | string;
  visible?: boolean;
  withCloseBtn?: boolean;
  withoutWrappers?: boolean;
} & Omit<
  React.ComponentProps<typeof BottomSheet>,
  'backdropComponent' | 'children' | 'index' | 'ref' | 'snapPoints'
>;

export const SimpleBottomSheet: React.FC<Props> = ({
  children,
  footer,
  height = '50%',
  onClose,
  title,
  visible,
  withoutWrappers,
  ...props
}) => {
  const ref = React.useRef<BottomSheetModal>(null);
  const snapPoints = React.useMemo(() => [1, height], [height]);
  const insets = useSafeAreaInsets();

  React.useEffect(() => {
    visible ? ref.current?.present() : ref.current?.close();
  }, [visible]);

  const handleChange = (index: number) => {
    if (index === 0) {
      onClose?.();
    }
  };

  return (
    <BottomSheetModal
      enablePanDownToClose
      {...props}
      backdropComponent={(backdropProps) => (
        <Backdrop {...backdropProps} onClose={onClose} />
      )}
      footerComponent={
        footer &&
        ((p) => (
          <BottomSheetFooter bottomInset={insets.bottom} {...p}>
            {footer}
          </BottomSheetFooter>
        ))
      }
      index={1}
      onChange={handleChange}
      onDismiss={onClose}
      ref={ref}
      snapPoints={snapPoints}
    >
      {withoutWrappers ? (
        children
      ) : (
        <Content>
          {title && (
            <Header>
              {typeof title === 'string' ? <Title>{title}</Title> : title}
            </Header>
          )}
          {children}
        </Content>
      )}
    </BottomSheetModal>
  );
};

const Content = styled(BottomSheetView, {});

const Header = styled(View, {
  padding: 10,
});

const Title = styled(Text, {
  fontSize: 20,
  textAlign: 'center',
});
