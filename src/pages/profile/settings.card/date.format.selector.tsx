import * as React from 'react';

import { Select } from '@app/components/select';
import {
  DateFormatType,
  PreferenceDocument,
  usePreferenceQuery,
  useUpdatePreferenceMutation,
} from '@app/generated/server.gql';

export const DateFormatSelector: React.FC = () => {
  const preference = usePreferenceQuery();
  const userPreference = preference.data?.userPreference;
  const value = userPreference?.dateFormat;
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
      onChange={(dateFormat) =>
        updatePreference({
          variables: {
            data: {
              dateFormat,
            },
          },
        })
      }
      options={[
        { label: 'MM/DD/YYYY', value: DateFormatType.AMERICAN },
        { label: 'DD/MM/YYYY', value: DateFormatType.WORLD },
      ]}
      value={value}
    />
  );
};
