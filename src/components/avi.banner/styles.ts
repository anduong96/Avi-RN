import { Text, View } from 'react-native';

import { Logo } from '../logo';
import { styled } from '@app/lib/styled';

export const LogoContainer = styled(View, () => [
  {
    flexDirection: 'row',
    columnGap: 12,
    flexGrow: 1,
    alignItems: 'center',
  },
]);

export const StyledLogo = styled(Logo, () => [
  {
    width: 40,
    height: 30,
  },
]);

export const Content = styled(View, (theme) => [
  {
    padding: theme.space.medium,
  },
]);

export const Background = styled(View, () => [
  {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
]);

export const LogoText = styled(Text, () => [
  {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: -3,
  },
]);
