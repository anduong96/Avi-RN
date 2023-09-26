import * as React from 'react';

import {
  BottomSheetFlatList,
  SCREEN_HEIGHT,
  TouchableOpacity,
} from '@gorhom/bottom-sheet';
import { Text, View } from 'react-native';
import Animated, { FadeInRight, FadeOutRight } from 'react-native-reanimated';
import { FLIGHT_SEARCH_STATE_STEP, flightSearchState } from '../../state';

import { AirlineLogoAvatar } from '@app/components/airline.logo.avatar';
import { FaIcon } from '@app/components/icons.fontawesome';
import { Input } from '@app/components/input';
import { LoadingOverlay } from '@app/components/loading.overlay';
import { useAirlinesQuery } from '@app/generated/server.gql';
import { vibrate } from '@app/lib/haptic.feedback';
import { useTheme } from '@app/lib/hooks/use.theme';
import { styled } from '@app/lib/styled';
import type BottomSheet from '@gorhom/bottom-sheet';
import { BlurView } from '@react-native-community/blur';
import Fuse from 'fuse.js';
import moment from 'moment';
import type { TextInput } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { FlightSearchSheet } from '../../sheet';

export const AirlineSheetSelector: React.FC = () => {
  const insets = useSafeAreaInsets();
  const options = useAirlinesQuery({
    fetchPolicy: 'cache-first',
    pollInterval: moment.duration({ hours: 6 }).milliseconds(),
  });
  const sheet = React.useRef<BottomSheet>(null);
  const input = React.useRef<TextInput>(null);
  const theme = useTheme();
  const [isSearching, setIsSearching] = React.useState(false);
  const [search, setSearch] = React.useState<string>();
  const snapPoints = React.useMemo(
    () => [450, SCREEN_HEIGHT - insets.bottom - theme.space.medium * 2],
    [insets, theme],
  );

  const display = React.useMemo(() => {
    const airlines = options?.data?.airlines ?? [];
    if (!search) {
      return airlines;
    }

    return new Fuse(airlines, { keys: ['name', 'iata'] })
      .search(search)
      .map((entry) => entry.item);
  }, [search, options.data]);

  const handleSelect = (airlineIata: string) => {
    vibrate('impactMedium');
    flightSearchState.actions.setState({ airlineIata });
    flightSearchState.actions.setStep(FLIGHT_SEARCH_STATE_STEP.FLIGHT_NUMBER);
  };

  React.useEffect(() => {
    sheet.current?.snapToIndex(isSearching ? 1 : 0);
  }, [isSearching]);

  return (
    <FlightSearchSheet snapPoints={snapPoints} index={0} ref={sheet}>
      <LoadingOverlay isLoading={options.loading} />
      <BottomSheetFlatList
        data={display}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          return (
            <Airline onPress={() => handleSelect(item.iata)}>
              <AirlineLogoAvatar
                size={50}
                uri={item.logoCompactImageURL}
                iata={item.iata}
              />
              <AirlineMeta>
                <AirlineIataText>{item.iata}</AirlineIataText>
                <AirlineNameText>{item.name}</AirlineNameText>
              </AirlineMeta>
            </Airline>
          );
        }}
        ListHeaderComponent={
          <Header>
            <SearchInput
              allowClear
              ref={input}
              onFocus={() => setIsSearching(true)}
              onBlur={() => setIsSearching(false)}
              onChange={(value) => setSearch(value)}
              prefix={<FaIcon name="search" />}
            />
            {isSearching && (
              <Animated.View
                entering={FadeInRight}
                exiting={FadeOutRight}
                style={{ height: 50, width: 65 }}
              >
                <CancelBtn onPress={() => input.current?.blur?.()}>
                  <CancelBtnText>Cancel</CancelBtnText>
                </CancelBtn>
              </Animated.View>
            )}
          </Header>
        }
      />
    </FlightSearchSheet>
  );
};

const Header = styled(
  BlurView,
  (theme) => [
    {
      borderRadius: theme.borderRadius,
      padding: theme.space.medium,
      flexDirection: 'row',
    },
  ],
  {
    blurType: 'light',
    blurAmount: 20,
  },
);

const SearchInput = styled(Input, (theme) => [
  {
    backgroundColor: theme.pallette.grey[100],
    flexGrow: 1,
  },
]);

const Airline = styled(TouchableOpacity, (theme) => [
  {
    paddingHorizontal: theme.space.small,
    paddingVertical: theme.space.small,
    gap: theme.space.medium,
    flexDirection: 'row',
    overflow: 'hidden',
    flexShrink: 1,
    flexWrap: 'nowrap',
    width: '100%',
  },
]);

const AirlineMeta = styled(View, () => [
  {
    flexGrow: 1,
    flexShrink: 1,
  },
]);

const AirlineIataText = styled(Text, (theme) => [
  theme.typography.presets.small,
  {
    fontWeight: 'bold',
    color: theme.typography.secondaryColor,
  },
]);

const AirlineNameText = styled(Text, (theme) => [
  theme.typography.presets.p1,
  {
    flexShrink: 1,
  },
]);

const CancelBtn = styled(TouchableOpacity, () => [
  {
    height: '100%',
    flexGrow: 1,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
]);

const CancelBtnText = styled(Text, (theme) => [
  theme.typography.presets.p1,
  {
    color: theme.pallette.active,
  },
]);
