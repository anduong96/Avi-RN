import { withStyled } from '@app/lib/styled';
import { Group } from '@app/components/group';
import { Typography } from '@app/components/typography';

export const TileLabel = withStyled(Typography, undefined, {
  color: 'secondary',
  type: 'p2',
});

export const TileValue = withStyled(Typography, undefined, {
  type: 'h1',
});

export const Section = withStyled(Group, undefined, {
  paddingHorizontal: 'medium',
});

export const SectionTile = withStyled(
  Group,
  (theme) => [
    {
      backgroundColor: theme.pallette.card,
      borderRadius: theme.borderRadius,
      flexBasis: 1,
      flexGrow: 1,
      gap: theme.space.medium,
      padding: theme.space.medium,
    },
  ],
  {
    horizontalAlign: 'center',
    verticalAlign: 'center',
  },
);

export const InnerTile = withStyled(SectionTile, (theme) => [
  {
    borderColor: theme.pallette.background,
    borderStyle: 'solid',
    borderWidth: theme.borderWidth,
    gap: theme.space.small,
  },
]);

export const InnerTileValue = withStyled(Typography, undefined, {
  type: 'p1',
});

export const InnerTileLabel = withStyled(Typography, undefined, {
  color: 'secondary',
  type: 'small',
});
