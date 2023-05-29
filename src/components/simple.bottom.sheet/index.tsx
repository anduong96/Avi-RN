import * as React from 'react';

import { BottomSheetFooter, BottomSheetModal } from '@gorhom/bottom-sheet';
import { Content, Header, Title } from './styles';

import { Backdrop } from './backdrop';
import type BottomSheet from '@gorhom/bottom-sheet';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type Props = {
  height?: string | number;
  visible?: boolean;
  children: React.ReactElement | React.ReactElement[];
  withCloseBtn?: boolean;
  title?: string | React.ReactElement;
  footer?: React.ReactElement;
  withoutWrappers?: boolean;
} & Omit<
  React.ComponentProps<typeof BottomSheet>,
  'snapPoints' | 'children' | 'index' | 'backdropComponent' | 'ref'
>;

export const SimpleBottomSheet: React.FC<Props> = ({
  height = '50%',
  visible,
  children,
  title,
  footer,
  onClose,
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
      onDismiss={onClose}
      ref={ref}
      index={1}
      snapPoints={snapPoints}
      onChange={handleChange}
      footerComponent={
        footer &&
        ((p) => (
          <BottomSheetFooter bottomInset={insets.bottom} {...p}>
            {footer}
          </BottomSheetFooter>
        ))
      }
      backdropComponent={(backdropProps) => (
        <Backdrop {...backdropProps} onClose={onClose} />
      )}
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
