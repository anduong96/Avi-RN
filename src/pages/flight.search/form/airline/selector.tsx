import * as React from 'react';

import { ActivityIndicator, Text, View } from 'react-native';
import Animated, {
  FadeOut,
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
} from 'react-native-reanimated';
import {
  BottomSheetFlatList,
  SCREEN_HEIGHT,
  TouchableOpacity,
} from '@gorhom/bottom-sheet';
import { FLIGHT_SEARCH_STATE_STEP, flightSearchState } from '../../state';

import { BlurView } from '@react-native-community/blur';
import type BottomSheet from '@gorhom/bottom-sheet';
import { FaIcon } from '@app/components/icons.fontawesome';
import FastImage from 'react-native-fast-image';
import { FlightSearchSheet } from '../../sheet';
import Fuse from 'fuse.js';
import { Input } from '@app/components/input';
import type { TextInput } from 'react-native';
import { styled } from '@app/lib/styled';
import { useAirlinesQuery } from '@app/generated/server.gql';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '@app/lib/hooks/use.theme';
import { vibrate } from '@app/lib/haptic.feedback';

export const AirlineSheetSelector: React.FC = () => {
  const insets = useSafeAreaInsets();
  const options = useAirlinesQuery();
  const sheet = React.useRef<BottomSheet>(null);
  const input = React.useRef<TextInput>(null);
  const theme = useTheme();
  const [isSearching, setIsSearching] = React.useState(false);
  const [search, setSearch] = React.useState<string>();
  const snapPoints = React.useMemo(
    () => [450, SCREEN_HEIGHT - insets.bottom - theme.space.medium],
    [insets, theme],
  );
  const isSearchingDerived = useDerivedValue(() => isSearching, [isSearching]);
  const inputStyle = useAnimatedStyle(() => ({
    width: withTiming(isSearchingDerived.value ? 65 : 0),
  }));

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
      <BottomSheetFlatList
        data={display}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        keyExtractor={(item) => item.id}
        ListEmptyComponent={
          <>
            {!options.data && options.loading && (
              <Animated.View exiting={FadeOut}>
                <ActivityIndicator />
              </Animated.View>
            )}
          </>
        }
        renderItem={({ item }) => {
          return (
            <Airline onPress={() => handleSelect(item.iata)}>
              <AirlineLogo>
                <FastImage
                  source={{ uri: item.logoCompactImageURL }}
                  style={{ width: '100%', height: '100%' }}
                  resizeMode="contain"
                />
              </AirlineLogo>
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
            <Animated.View
              style={[
                inputStyle,
                {
                  height: '100%',
                  flexDirection: 'row',
                },
              ]}
            >
              <TouchableOpacity
                onPress={() => input.current?.blur?.()}
                style={{
                  height: '100%',
                  flexGrow: 1,
                  alignItems: 'center',
                  flexDirection: 'row',
                  justifyContent: 'flex-end',
                }}
              >
                <Text
                  style={[
                    theme.typography.presets.p1,
                    { color: theme.pallette.active },
                  ]}
                >
                  Cancel
                </Text>
              </TouchableOpacity>
            </Animated.View>
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

const AirlineLogo = styled(View, (theme) => [
  theme.presets.centered,
  {
    padding: 10,
    backgroundColor: theme.pallette.grey[50],
    borderRadius: 200,
    overflow: 'hidden',
    width: 50,
    height: undefined,
    aspectRatio: 1,
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
