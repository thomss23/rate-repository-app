import Text from './Text';
import useRepositories from '../hooks/useRepositories';
import { RepositoryListContainer } from './RepositoryListContainer';
import { useState } from 'react';

const RepositoryList = () => {
  const [orderBy, setOrderBy] = useState('CREATED_AT');
  const [orderDirection, setOrderDirection] = useState('DESC');
  const { repositories, loading, error } = useRepositories(orderBy, orderDirection);

  if (loading) {
    return <Text>Loading...</Text>
  }
  if (error) {
    console.log(error)
    return <Text>Error</Text>
  }

  const handleOrderChange = (value) => {
    if (value === "CREATED_AT") {
      setOrderBy("CREATED_AT");
      setOrderDirection("DESC");
    } else if (value === "RATING_AVERAGE_ASC") {
      setOrderBy("RATING_AVERAGE");
      setOrderDirection('ASC');
    } else if (value === "RATING_AVERAGE_DESC") {
      setOrderBy("RATING_AVERAGE");
      setOrderDirection('DESC');
    }
  };
  return <RepositoryListContainer repositories={repositories} orderBy={orderBy} handleOrderChange={handleOrderChange} />;
};

export default RepositoryList;