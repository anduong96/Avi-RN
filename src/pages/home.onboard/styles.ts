import { Image, View } from 'react-native';

import { styled } from '@app/lib/styled';

export const Container = styled(View, () => [
  {
    flexGrow: 1,
  },
]);

export const Background = styled(Image, () => [
  {
    position: 'absolute',
    height: '100%',
    left: -100,
    top: 0,
    bottom: 0,
    right: 100,
  },
]);

export const Header = styled(View, (theme) => [
  {
    marginTop: theme.insets.top || theme.space.medium,
    paddingHorizontal: theme.space.large,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
]);

export const Footer = styled(View, (theme) => [
  {
    paddingBottom: theme.insets.bottom || theme.space.medium,
    paddingHorizontal: theme.space.large,
  },
]);

export const Content = styled(View, (theme) => [
  {
    flexGrow: 1,
    paddingHorizontal: theme.space.small,
    paddingVertical: theme.space.large,
    justifyContent: 'flex-end',
  },
]);
