import * as React from 'react';

import { BlurredBottomSheetBackground } from './sheet.background';
import BottomSheet from '@gorhom/bottom-sheet';
import { useTheme } from '@app/lib/hooks/use.theme';

type Props = {
  children: React.ReactNode;
  snapPoints: number[];
  index?: number;
};

export const FlightSearchSheet = React.forwardRef<BottomSheet, Props>(
  ({ children, snapPoints, index }, ref) => {
    const theme = useTheme();

    return (
      <BottomSheet
        detached
        ref={ref}
        index={index}
        snapPoints={snapPoints}
        enablePanDownToClose={false}
        backgroundComponent={BlurredBottomSheetBackground}
        handleStyle={{ display: 'none' }}
        style={[
          theme.presets.shadows[100],
          {
            borderRadius: theme.borderRadius,
            marginHorizontal: theme.space.small,
          },
        ]}
      >
        {children}
      </BottomSheet>
    );
  },
);
