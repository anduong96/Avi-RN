import * as React from 'react';

import { Card } from '@app/components/card';
import { Select } from '@app/components/select';
import { ListItem } from '@app/components/list.item';
import { SwitchButton } from '@app/components/switch';
import { FaIcon } from '@app/components/icons.fontawesome';
import {
  MeasurementType,
  PreferenceDocument,
  usePreferenceQuery,
  useUpdatePreferenceMutation,
} from '@app/generated/server.gql';

export const SettingsCard: React.FC = () => {
  const preference = usePreferenceQuery();
  const [updatePreference, { loading: updating }] = useUpdatePreferenceMutation(
    { refetchQueries: [{ query: PreferenceDocument }] },
  );

  return (
    <Card>
      <ListItem
        description="Coming soon!"
        extra={<SwitchButton disabled options={['dark']} value="dark" />}
        icon={<FaIcon name="palette" />}
        title="Theme"
      />
      <ListItem
        extra={
          <Select
            isLoading={updating || preference.loading}
            onChange={(value) =>
              updatePreference({
                variables: {
                  data: {
                    measurement: value,
                  },
                },
              })
            }
            options={[
              { label: 'American', value: MeasurementType.AMERICAN },
              { label: 'Metric', value: MeasurementType.METRIC },
            ]}
            value={preference.data?.userPreference.measurement}
          />
        }
        icon={<FaIcon name="ruler" />}
        title="Measurement"
      />
    </Card>
  );
};
