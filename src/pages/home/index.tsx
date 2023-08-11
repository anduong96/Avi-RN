import * as React from 'react';

import {
  AddBtn,
  Container,
  Content,
  DeleteITemBtnText,
  DeleteItemBtn,
  FlightViewContainer,
  FlightViewTag,
  FlightViewTagText,
  Header,
  ListItem,
  ListItemActions,
  Meta,
  PageHeader,
  Title,
  UserBtn,
} from './styles';
import { Alert, RefreshControl } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';
import BottomSheet, { BottomSheetFlatList } from '@gorhom/bottom-sheet';
import {
  GetUserFlightsDocument,
  useDeleteUserFlightMutation,
  useGetUserFlightsQuery,
} from '@app/generated/server.gql';

import { BlurredBottomSheetBackground } from '../flight.search/sheet/sheet.background';
import { FaIcon } from '@app/components/icons.fontawesome';
import { FlightCard } from '@app/components/flight.card';
import { Logo } from '@app/components/logo';
import type { MainStackParam } from '@app/stacks';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { PageContainer } from '@app/components/page.container';
import { SheetFooter } from './sheet.footer';
import { Swipeable } from 'react-native-gesture-handler';
import { UserAvatar } from '@app/components/user.avatar';
import { WINDOW_HEIGHT } from '@app/lib/platform';
import { size } from 'lodash';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '@app/lib/hooks/use.theme';
import { vibrate } from '@app/lib/haptic.feedback';

type Navigation = NativeStackNavigationProp<MainStackParam, 'Home'>;

export const HomePage: React.FC = () => {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<Navigation>();
  const flights = useGetUserFlightsQuery();
  const [removeFlight] = useDeleteUserFlightMutation({
    refetchQueries: [{ query: GetUserFlightsDocument }],
  });
  const snapPoints = React.useMemo(
    () => [Math.min(WINDOW_HEIGHT / 2, 400), WINDOW_HEIGHT - insets.top],
    [insets],
  );

  const handleSearchFlights = () => {
    vibrate('impactMedium');
    navigation.push('FlightSearchStack', {
      screen: 'Search',
      params: {},
    });
  };

  const handleOpenProfile = () => {
    vibrate('impactMedium');
    navigation.push('Profile');
  };

  const handleOpenFlight = (flightID: string) => {
    vibrate('impactMedium');
    navigation.push('FlightStack', {
      screen: 'Flight',
      params: {
        flightID,
      },
    });
  };

  const handleRemoveFlight = (flightID: string) => {
    vibrate('impactHeavy');
    Alert.alert('Are you sure?', undefined, [
      {
        text: 'Cancel',
      },
      {
        text: 'Proceed',
        onPress: () => {
          removeFlight({
            variables: {
              flightID,
            },
          });
        },
      },
    ]);
  };

  return (
    <PageContainer>
      <Container>
        <PageHeader>
          <Logo />
          <UserBtn onPress={handleOpenProfile}>
            <UserAvatar />
          </UserBtn>
        </PageHeader>
        <Content style={[{ paddingBottom: snapPoints[0] }]}>
          <Animated.View entering={FadeIn}>
            <AddBtn onPress={handleSearchFlights}>
              <FaIcon size={30} name="plus" color={theme.pallette.white} />
            </AddBtn>
          </Animated.View>
        </Content>
        <BottomSheet
          index={0}
          snapPoints={snapPoints}
          backgroundComponent={BlurredBottomSheetBackground}
          footerComponent={SheetFooter}
          handleIndicatorStyle={{ display: 'none' }}
        >
          <BottomSheetFlatList
            refreshControl={
              <RefreshControl
                refreshing={flights.loading}
                onRefresh={() => flights.refetch()}
              />
            }
            ListHeaderComponent={
              <Header>
                <Meta>
                  <Title>Flights</Title>
                </Meta>
                <FlightViewContainer>
                  {/* TODO: cycle switcher */}
                  <FlightViewTag>
                    <FlightViewTagText>
                      {size(flights.data?.userFlights) || ''} Active
                    </FlightViewTagText>
                  </FlightViewTag>
                  <FlightViewTag
                    style={{
                      position: 'absolute',
                      zIndex: -1,
                      left: -5,
                      top: -5,
                      backgroundColor: theme.pallette.grey[300],
                    }}
                  >
                    <FlightViewTagText>Past</FlightViewTagText>
                  </FlightViewTag>
                </FlightViewContainer>
              </Header>
            }
            data={flights.data?.userFlights}
            stickyHeaderIndices={[0]}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <Swipeable
                renderRightActions={() => {
                  return (
                    <ListItemActions>
                      <DeleteItemBtn
                        onPress={() => handleRemoveFlight(item.flightID)}
                      >
                        <DeleteITemBtnText>Remove</DeleteITemBtnText>
                      </DeleteItemBtn>
                    </ListItemActions>
                  );
                }}
              >
                <ListItem onPress={() => handleOpenFlight(item.flightID)}>
                  <FlightCard value={item} />
                </ListItem>
              </Swipeable>
            )}
          />
        </BottomSheet>
      </Container>
    </PageContainer>
  );
};
