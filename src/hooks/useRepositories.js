import { useQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = () => {
  const { data, loading, error, refetch } = useQuery(GET_REPOSITORIES, {fetchPolicy: 'cache-and-network'});
  const [repositories, setRepositories] = useState([]);

  // Update the repositories state whenever the data changes
  useEffect(() => {
    if (data) {
      setRepositories(data.repositories);
    }
  }, [data]);

  return { repositories, loading, error, refetch };
};

export default useRepositories;