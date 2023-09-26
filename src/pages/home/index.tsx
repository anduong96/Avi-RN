import * as React from 'react';

import {
  GetUserActiveFlightsDocument,
  useDeleteUserFlightMutation,
  useGetUserActiveFlightsQuery,
  useGetUserArchivedFlightsQuery,
  useUserHasFlightsQuery,
} from '@app/generated/server.gql';
import BottomSheet, { BottomSheetFlatList } from '@gorhom/bottom-sheet';
import { Alert, View } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';
import {
  AddBtn,
  Container,
  Content,
  DeleteITemBtnText,
  DeleteItemBtn,
  Header,
  ListItem,
  ListItemActions,
  Meta,
  PageHeader,
  UserBtn,
} from './styles';

import { FlightCard } from '@app/components/flight.card';
import { IconBtn } from '@app/components/icon.btn';
import { FaIcon } from '@app/components/icons.fontawesome';
import { Logo } from '@app/components/logo';
import { PageContainer } from '@app/components/page.container';
import { UserAvatar } from '@app/components/user.avatar';
import { vibrate } from '@app/lib/haptic.feedback';
import { useTheme } from '@app/lib/hooks/use.theme';
import { WINDOW_HEIGHT } from '@app/lib/platform';
import { styled } from '@app/lib/styled';
import type { MainStackParam } from '@app/stacks';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { isEmpty } from 'lodash';
import { Swipeable } from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BlurredBottomSheetBackground } from '../flight.search/sheet/sheet.background';
import { HomeOnboardPage } from '../home.onboard';
import { SheetFooter } from './sheet.footer';
import { Title } from './title';

type Navigation = NativeStackNavigationProp<MainStackParam, 'Home'>;

export const HomePage: React.FC = () => {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<Navigation>();
  const flights = useGetUserActiveFlightsQuery();
  const hasFlights = useUserHasFlightsQuery();
  const archived = useGetUserArchivedFlightsQuery();
  const activeFlights = flights.data?.userActiveFlights;
  const archivedFlights = archived.data?.userArchivedFlights;
  const [removeFlight] = useDeleteUserFlightMutation({
    refetchQueries: [{ query: GetUserActiveFlightsDocument }],
  });
  const snapPoints = React.useMemo(
    () => [Math.min(WINDOW_HEIGHT / 2, 400), WINDOW_HEIGHT - insets.top],
    [insets],
  );

  const handleOpenArchivedFlights = () => {
    vibrate('impactMedium');
    navigation.push('FlightStack', {
      screen: 'Archived',
    });
  };

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

  if (!hasFlights.data?.userHasFlights) {
    return <HomeOnboardPage />;
  }

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
            ListHeaderComponent={
              <Header>
                <Meta>
                  <Title />
                </Meta>
                <Actions>
                  {!isEmpty(archivedFlights) && (
                    <ArchiveFlightsBtn
                      icon="archive"
                      size={12}
                      color={theme.pallette.grey[800]}
                      onPress={handleOpenArchivedFlights}
                    />
                  )}
                </Actions>
              </Header>
            }
            data={activeFlights}
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

const Actions = styled(View, (theme) => [
  {
    flexDirection: 'row',
    gap: theme.space.tiny,
  },
]);

const ArchiveFlightsBtn = styled(IconBtn, (theme) => [
  {
    backgroundColor: theme.pallette.grey[200],
    borderRadius: 100,
  },
]);
