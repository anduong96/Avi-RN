import {
  IsInWaitListDocument,
  useAddToWaitListMutation,
  useIsInWaitListQuery,
} from '@app/generated/server.gql';

export function useFeature(feature: string) {
  const request = useIsInWaitListQuery({
    variables: {
      feature,
    },
  });
  const [add, { loading: isAdding }] = useAddToWaitListMutation({
    refetchQueries: [
      {
        query: IsInWaitListDocument,
        variables: {
          feature,
        },
      },
    ],
    variables: {
      feature,
    },
  });

  return {
    add,
    isActive: !!request.data?.userIsInWaitList,
    isAdding,
    isLoading: request.loading,
  };
}
