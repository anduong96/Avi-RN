import * as React from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { Card } from '@app/components/card';
import { useTheme } from '@app/lib/hooks/use.theme';
import { ListItem } from '@app/components/list.item';
import { CorePageSlug } from '@app/pages/[core]/constants';
import { FaIcon } from '@app/components/icons.fontawesome';
import { HorizontalDivider } from '@app/components/divider.horizontal';
import { useRootNavigation } from '@app/navigation/use.root.navigation';

export const LegalCard: React.FC = () => {
  const theme = useTheme();
  const navigation = useRootNavigation();
  const Extra = <FaIcon color={theme.pallette.active} name="chevron-right" />;

  function handlePress(slug: CorePageSlug) {
    navigation.push('Core', {
      slug,
    });
  }

  return (
    <Card padding={'medium'} title="Legal">
      <TouchableOpacity onPress={() => handlePress(CorePageSlug.TERMS)}>
        <ListItem
          extra={Extra}
          icon={<FaIcon name="book-section" />}
          title="Terms of Service"
        />
      </TouchableOpacity>
      <HorizontalDivider />
      <TouchableOpacity onPress={() => handlePress(CorePageSlug.PRIVACY)}>
        <ListItem
          extra={Extra}
          icon={<FaIcon name="book-user" />}
          title="Privacy Policy"
        />
      </TouchableOpacity>
    </Card>
  );
};
