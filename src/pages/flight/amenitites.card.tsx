import * as React from 'react';
import { useMarkdown } from 'react-native-marked';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';

import tinycolor from 'tinycolor2';
import { Portal } from '@gorhom/portal';
import { isEmpty, isNil } from 'lodash';
import { useLayout } from '@react-native-community/hooks';

import type { AircraftAmenity } from '@app/generated/server.gql';

import { withStyled } from '@app/lib/styled';
import { APP_PORTAL_HOST } from '@app/lib/portal';
import { vibrate } from '@app/lib/haptic.feedback';
import { useTheme } from '@app/lib/hooks/use.theme';
import { FaIcon } from '@app/components/icons.fontawesome';
import { AircraftAmenityType } from '@app/generated/server.gql';
import { useAircraftAmenitiesQuery } from '@app/generated/server.gql';
import { BlurredBackground } from '@app/components/blurred/background';
import { PortalWindowOverlay } from '@app/components/portal.window.overlay';

import { useFlight } from './context';
import { SectionTile, TileLabel } from './styles';

export const AmenitiesCard: React.FC = () => {
  const flight = useFlight();
  const theme = useTheme();
  const layout = useLayout();
  const [expanded, setExpanded] = React.useState<AircraftAmenity>();
  const elements = useMarkdown(expanded?.descriptionMarkdown || '', {
    theme: {
      colors: {
        border: theme.pallette.borderColor,
        code: theme.pallette.text,
        link: theme.pallette.active,
        text: theme.pallette.text,
      },
    },
  });
  const seats = useAircraftAmenitiesQuery({
    skip: isNil(flight.aircraftTailNumber),
    variables: {
      tailNumber: flight.aircraftTailNumber!,
    },
  });

  const data = seats.data?.aircraftAmenities;
  if (isNil(data) || isEmpty(data)) {
    return null;
  }

  const getIcon = (type: AircraftAmenityType) => {
    switch (type) {
      case AircraftAmenityType.INTERNET:
        return 'wifi';
      case AircraftAmenityType.AC_POWER:
        return 'plug';
      case AircraftAmenityType.AUDIO:
        return 'headphones';
      case AircraftAmenityType.FOOD:
        return 'utensils';
      case AircraftAmenityType.VIDEO:
        return 'tv';
    }
  };

  const idealSize = 100;
  const count = Math.floor(layout.width / idealSize);
  const cellSize = Math.max(layout.width / count, 1) - theme.space.tiny;
  const usableCellSize = Number.isNaN(cellSize) ? 0 : cellSize;

  const handlePress = (item: AircraftAmenity) => {
    vibrate('impactHeavy');
    setExpanded(item);
  };

  return (
    <SectionTile>
      <TileLabel>Amenities</TileLabel>
      <List onLayout={layout.onLayout}>
        {data.map((item) => (
          <Item
            key={item.id}
            onPress={() => handlePress(item)}
            size={usableCellSize}
          >
            <FaIcon
              color={theme.pallette.active}
              name={getIcon(item.type)}
              size={usableCellSize / 3}
            />
          </Item>
        ))}
      </List>
      {!isNil(expanded) && (
        <Portal name={APP_PORTAL_HOST}>
          <PortalWindowOverlay>
            <Expanded>
              <BlurredBackground onTouchStart={() => setExpanded(undefined)} />
              <FaIcon
                color={theme.pallette.active}
                name={getIcon(expanded.type)}
                size={50}
              />
              <ExpandedContent>
                <MarkdownContent>
                  <ScrollView>
                    {elements.map((element, index) => (
                      <React.Fragment key={index.toString()}>
                        {element}
                      </React.Fragment>
                    ))}
                  </ScrollView>
                </MarkdownContent>
              </ExpandedContent>
            </Expanded>
          </PortalWindowOverlay>
        </Portal>
      )}
    </SectionTile>
  );
};

const Item = withStyled<{ size: number }, typeof TouchableOpacity>(
  TouchableOpacity,
  (theme, props) => [
    theme.presets.centered,
    {
      backgroundColor: tinycolor(theme.pallette.active)
        .setAlpha(0.1)
        .toRgbString(),
      borderRadius: theme.borderRadius,
      height: props.size,
      width: props.size,
    },
  ],
);

const List = withStyled(View, (theme) => ({
  flexDirection: 'row',
  flexWrap: 'wrap',
  gap: theme.space.tiny,
}));

const Expanded = withStyled(
  Animated.View,
  (theme) => [
    StyleSheet.absoluteFillObject,
    theme.presets.centered,
    {
      gap: theme.space.large,
      padding: theme.space.small,
    },
  ],
  {
    entering: FadeIn,
    exiting: FadeOut,
  },
);

const MarkdownContent = withStyled(View, {
  maxHeight: Math.min(Dimensions.get('screen').height - 300, 400),
});

const ExpandedContent = withStyled(View, (theme) => ({
  backgroundColor: theme.pallette.background,
  borderRadius: theme.borderRadius,
  gap: theme.space.medium,
  padding: theme.space.medium,
}));
