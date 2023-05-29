import { Text, View } from 'react-native';

import { BottomSheetView } from '@gorhom/bottom-sheet';
import { styled } from '../../lib/styled';

export const Content = styled(BottomSheetView, {});

export const Header = styled(View, {
  padding: 10,
});

export const Title = styled(Text, {
  fontSize: 20,
  textAlign: 'center',
});
