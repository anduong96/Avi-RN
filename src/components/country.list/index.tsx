import * as React from 'react';

import {
  Container,
  Header,
  Item,
  ItemAction,
  ItemActionText,
  ItemLabel,
  Section,
  SectionLabel,
} from './styles';
import { groupBy, isEmpty } from 'lodash';

import type { CountriesQuery } from '@app/generated/server.gql';
import Fuse from 'fuse.js';
import { Input } from '../input';
import { MaterialIcon } from '../material.icons';
import { SectionList } from 'react-native';
import { tryNice } from 'try-nice';
import { useCountriesQuery } from '@app/generated/server.gql';

type Props = {
  value?: string;
  type?: 'dialCode' | 'isoCode';
  onSelect?: (value: CountriesQuery['countries'][number]) => void;
};

export const CountryList: React.FC<Props> = ({
  value,
  type = 'isoCode',
  onSelect,
}) => {
  const [search, setSearch] = React.useState<string>();
  const list = React.useRef<SectionList>(null);
  const options = useCountriesQuery({
    nextFetchPolicy: 'cache-only',
  });

  const active = React.useMemo(
    () =>
      options.data?.countries && value
        ? options.data.countries.find(
            (country) =>
              (type === 'isoCode' ? country.isoCode : country.dialCode) ===
              value,
          )
        : undefined,
    [options.data, value, type],
  );

  const sections = React.useMemo(
    () =>
      Object.entries(
        groupBy(
          search && options.data?.countries
            ? new Fuse(options.data.countries, {
                keys: ['isoCode', 'name', 'dialCode'],
              })
                .search(search)
                .map((r) => r.item)
            : options.data?.countries,
          (country) => country.name[0].toUpperCase(),
        ),
      ).map(([title, data]) => ({
        title,
        data,
      })),
    [options.data, search],
  );

  React.useEffect(() => {
    if (!isEmpty(sections)) {
      list.current?.scrollToLocation({
        itemIndex: 0,
        sectionIndex: 0,
        animated: true,
      });
    }
  }, [sections]);

  return (
    <Container>
      <Header>
        <Input
          type="filled"
          size="small"
          prefix={<MaterialIcon name="magnify" />}
          value={search}
          onChange={(nextValue) => setSearch(nextValue)}
        />
      </Header>
      <SectionList
        ref={list}
        sections={sections}
        keyExtractor={(item) => item.isoCode}
        stickyHeaderHiddenOnScroll={false}
        onScrollToIndexFailed={() => {
          tryNice(() =>
            list.current?.scrollToLocation({
              itemIndex: 0,
              sectionIndex: 0,
              animated: true,
            }),
          );
        }}
        renderItem={({ item }) => (
          <Item onPress={() => onSelect?.(item)}>
            <ItemLabel isActive={active?.isoCode === item.isoCode}>
              {item.name}
            </ItemLabel>
            <ItemAction>
              <ItemActionText>
                {type === 'isoCode' ? item.isoCode : item.dialCode}
              </ItemActionText>
            </ItemAction>
          </Item>
        )}
        renderSectionHeader={({ section }) => (
          <Section blurAmount={70} blurType={'xlight'}>
            <SectionLabel>{section.title}</SectionLabel>
          </Section>
        )}
      />
    </Container>
  );
};
