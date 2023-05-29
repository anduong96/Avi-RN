import * as React from 'react';

import { BottomSheetFlatList, TouchableOpacity } from '@gorhom/bottom-sheet';
import { Text, View } from 'react-native';

import { BlurView } from '@react-native-community/blur';
import { FaIcon } from '@app/components/icons.fontawesome';
import FastImage from 'react-native-fast-image';
import Fuse from 'fuse.js';
import { Input } from '@app/components/input';
import { logger } from '@app/lib/logger';
import { styled } from '@app/lib/styled';
import { useAirlinesQuery } from '@app/generated/server.gql';
import { vibrate } from '@app/lib/haptic.feedback';

export const AirlineSelect: React.FC = () => {
  const [search, setSearch] = React.useState<string>();
  const options = useAirlinesQuery();
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
    logger.debug({ airlineIata });
  };

  return (
    <BottomSheetFlatList
      showsVerticalScrollIndicator={false}
      stickyHeaderHiddenOnScroll={true}
      stickyHeaderIndices={[0]}
      data={display}
      keyboardShouldPersistTaps="handled"
      keyExtractor={(item) => item.id}
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
            onChange={(value) => setSearch(value)}
            prefix={<FaIcon name="search" />}
          />
        </Header>
      }
    />
  );
};

const Header = styled(
  BlurView,
  (theme) => [
    {
      padding: theme.space.medium,
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
