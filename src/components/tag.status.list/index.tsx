import * as React from 'react';

import { compact, isEmpty, orderBy } from 'lodash';

import type { ComponentProps } from '@app/types/component.props';
import { List } from '../list';
import type { RenderableList } from '@app/types/renderable.list';
import { TagStatus } from '../tag.status';
import pluralize from 'pluralize';
import { useTheme } from '@app/lib/hooks/use.theme';

type Props = ComponentProps<{
  hideFalsyValue?: boolean;
  value: RenderableList<{
    label: string;
    value: boolean | number;
  }>;
}>;

export const TagStatusList: React.FC<Props> = ({
  value,
  style,
  hideFalsyValue,
}) => {
  const theme = useTheme();
  const data = compact(value).filter((item) => !!item.value || !hideFalsyValue);

  if (isEmpty(data)) {
    return null;
  }

  return (
    <List
      style={[
        {
          rowGap: theme.space.tiny,
          columnGap: theme.space.small,
          flexShrink: 1,
          flexWrap: 'wrap',
        },
        style,
      ]}
      horizontal
      data={orderBy(data, [(item) => item.value], ['desc'])}
      keyExtractor={(item, index) => item.label + index}
      renderItem={(item) => (
        <TagStatus value={item.value}>
          {typeof item.value === 'number'
            ? pluralize(item.label, item.value)
            : item.label}
        </TagStatus>
      )}
    />
  );
};
