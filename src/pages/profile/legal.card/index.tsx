import * as React from 'react';
import { View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { withStyled } from '@app/lib/styled';
import { Card } from '@app/components/card';
import { useTheme } from '@app/lib/hooks/use.theme';
import { ListItem } from '@app/components/list.item';
import { FaIcon } from '@app/components/icons.fontawesome';
import { HorizontalDivider } from '@app/components/divider.horizontal';
import { useRootNavigation } from '@app/navigation/use.root.navigation';

export const LegalCard: React.FC = () => {
  const theme = useTheme();
  const navigation = useRootNavigation();
  const Extra = (
    <Btn>
      <FaIcon color={theme.pallette.active} name="chevron-right" />
    </Btn>
  );

  return (
    <Card>
      <TouchableOpacity onPress={() => navigation.push('TermsOfService')}>
        <ListItem
          extra={Extra}
          icon={<FaIcon name="book-section" />}
          title="Terms of Service"
        />
      </TouchableOpacity>
      <HorizontalDivider />
      <TouchableOpacity onPress={() => navigation.push('PrivacyPolicies')}>
        <ListItem
          extra={Extra}
          icon={<FaIcon name="book-user" />}
          title="Privacy Policy"
        />
      </TouchableOpacity>
    </Card>
  );
};

const Btn = withStyled(View, (theme) => [
  {
    paddingHorizontal: theme.space.medium,
  },
]);
