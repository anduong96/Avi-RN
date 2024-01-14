import type { RouteProp } from '@react-navigation/native';

import * as React from 'react';
import { Dimensions, ScrollView, View } from 'react-native';

import tinycolor from 'tinycolor2';
import { useRoute } from '@react-navigation/native';

import type { FlightStackParams } from '@app/navigation/flight.stack';

import { FILLER } from '@app/constants';
import { format } from '@app/lib/format';
import { withStyled } from '@app/lib/styled';
import { Group } from '@app/components/group';
import { useFlightQuery } from '@app/generated/server.gql';
import { ModalHeader } from '@app/components/modal.header';
import { useExitPage } from '@app/lib/hooks/use.exit.page';
import { PageContainer } from '@app/components/page.container';
import { LoadingOverlay } from '@app/components/loading.overlay';

import { TsaCard } from '../flight/tsa.card';
import { FlightContext } from '../flight/context';
import { GateTimeCard } from '../flight/gate.time.card';
import { TerminalsWaitTimeCard } from './terminals.wait.time';
import { Section, SectionTile, TileLabel, TileValue } from '../flight/styles';
import { HistoricalTerminalWaitTimeCard } from './historical.terminal.wait.time';

type Route = RouteProp<FlightStackParams, 'TSA'>;

export const FlightTSAPage: React.FC = () => {
  const route = useRoute<Route>();
  const exit = useExitPage();
  const flightID = route.params.flightID;
  const flight = useFlightQuery({
    variables: {
      flightID,
    },
  });

  return (
    <PageContainer>
      <LoadingOverlay isLoading={flight.loading} />
      {flight.data?.flight && (
        <ScrollView
          contentContainerStyle={{
            paddingBottom: Dimensions.get('screen').height * 0.3,
          }}
          showsVerticalScrollIndicator={false}
          stickyHeaderIndices={[0]}
        >
          <Header>
            <ModalHeader
              onClose={() => exit()}
              title={format('%s TSA', flight.data.flight.Origin.name)}
            />
          </Header>
          <Content>
            <FlightContext.Provider
              value={{ flight: flight.data.flight, flightID }}
            >
              <Group gap={'medium'}>
                <GateTimeCard type="departure" />
                <Section direction="row" gap="tiny">
                  <SectionTile>
                    <TileLabel>Terminal</TileLabel>
                    <TileValue>
                      {flight.data.flight.originTerminal ?? FILLER}
                    </TileValue>
                  </SectionTile>
                  <SectionTile>
                    <TileLabel>Gate</TileLabel>
                    <TileValue>
                      {flight.data.flight.originGate ?? FILLER}
                    </TileValue>
                  </SectionTile>
                </Section>
                <TsaCard />
                <TerminalsWaitTimeCard />
                <HistoricalTerminalWaitTimeCard />
              </Group>
            </FlightContext.Provider>
          </Content>
        </ScrollView>
      )}
    </PageContainer>
  );
};

const Content = withStyled(ScrollView, (theme) => [
  {
    flexGrow: 1,
    gap: theme.space.large,
    padding: theme.space.small,
  },
]);

const Header = withStyled(View, (theme) => [
  {
    backgroundColor: tinycolor(theme.pallette.background)
      .setAlpha(0.8)
      .toRgbString(),
  },
]);
