import { useQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import { GET_REPOSITORIES_WITH_FILTERS } from '../graphql/queries';

const useRepositories = (orderBy, orderDirection, searchKeyword, first) => {

  const { data, loading, fetchMore, refetch, ...result} = useQuery(GET_REPOSITORIES_WITH_FILTERS, {
    fetchPolicy: 'cache-and-network',
    variables: { orderBy, orderDirection, searchKeyword, first }
  });

  const [repositories, setRepositories] = useState(null);

  const handleFetchMore = () => {
    const canFetchMore = !loading && data?.repositories.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    fetchMore({
      variables: {
        orderBy,
        orderDirection,
        searchKeyword,
        after: data.repositories.pageInfo.endCursor,
      },
    });
  };

  // Update the repositories state whenever the data changes
  useEffect(() => {
    if (data) {
      setRepositories(data.repositories);
    }
  }, [data]);

  // return { repositories, loading, error, refetch };
  return {
    repositories,
    fetchMore: handleFetchMore,
    loading,
    refetch,
    ...result,
  };
};

export default useRepositories;