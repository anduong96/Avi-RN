import * as React from 'react';

import { AirlineSelect } from './airline.select';
import { BlurredBottomSheetBackground } from './sheet.background';
import BottomSheet from '@gorhom/bottom-sheet';
import { styled } from '@app/lib/styled';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '@app/lib/hooks/use.theme';

type Props = {
  height: number;
};

export const Sheet: React.FC<Props> = ({ height }) => {
  const snapPoints = React.useMemo(() => [height], [height]);
  const theme = useTheme();
  const insets = useSafeAreaInsets();

  return (
    <StyledBottomSheet
      detached
      index={0}
      snapPoints={snapPoints}
      backgroundComponent={BlurredBottomSheetBackground}
      bottomInset={insets.bottom}
      handleStyle={{ display: 'none' }}
      style={{ borderRadius: theme.borderRadius, overflow: 'hidden' }}
    >
      <AirlineSelect />
    </StyledBottomSheet>
  );
};

const StyledBottomSheet = styled(BottomSheet, (theme) => [
  theme.presets.shadows[100],
  {
    marginHorizontal: theme.space.small,
  },
]);
