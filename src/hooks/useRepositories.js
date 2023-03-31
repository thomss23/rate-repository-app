import { useQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import { GET_REPOSITORIES_WITH_FILTERS } from '../graphql/queries';

const useRepositories = (orderBy, orderDirection, searchKeyword) => {

  const { data, loading, error, refetch } = useQuery(GET_REPOSITORIES_WITH_FILTERS, {
    fetchPolicy: 'cache-and-network',
    variables: { orderBy, orderDirection, searchKeyword }
  });

  const [repositories, setRepositories] = useState(null);

  // Update the repositories state whenever the data changes
  useEffect(() => {
    if (data) {
      setRepositories(data.repositories);
    }
  }, [data]);

  return { repositories, loading, error, refetch };
};

export default useRepositories;