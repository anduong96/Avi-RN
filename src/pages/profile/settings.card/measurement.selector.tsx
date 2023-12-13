import * as React from 'react';

import { Select } from '@app/components/select';
import {
  MeasurementType,
  PreferenceDocument,
  usePreferenceQuery,
  useUpdatePreferenceMutation,
} from '@app/generated/server.gql';

export const MeasurementSelector: React.FC = () => {
  const preference = usePreferenceQuery();
  const userPreference = preference.data?.userPreference;
  const value = userPreference?.measurement;
  const [updatePreference, { loading: updating }] = useUpdatePreferenceMutation(
    {
      refetchQueries: [
        {
          query: PreferenceDocument,
        },
      ],
    },
  );

  return (
    <Select
      isLoading={updating || !preference.data}
      onChange={(measurement) =>
        updatePreference({
          variables: {
            data: {
              measurement,
            },
          },
        })
      }
      options={[
        { label: 'American', value: MeasurementType.AMERICAN },
        { label: 'Metric', value: MeasurementType.METRIC },
      ]}
      value={value}
    />
  );
};
