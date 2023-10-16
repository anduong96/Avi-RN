import type { MarkdownProps } from 'react-native-marked';

import * as React from 'react';
import RnMarkdown from 'react-native-marked';

import { styled } from '@app/lib/styled';

type Props = Pick<MarkdownProps, 'flatListProps' | 'value'>;

export const Markdown: React.FC<Props> = ({ flatListProps, value }) => {
  return <StyledMarkedDown flatListProps={flatListProps} value={value} />;
};

const StyledMarkedDown = styled(RnMarkdown, undefined, (theme) => ({
  theme: {
    colors: {
      background: theme.pallette.background,
      border: theme.pallette.borderColor,
      code: theme.pallette.textSecondary,
      link: theme.pallette.active,
      text: theme.pallette.text,
    },
  },
}));
