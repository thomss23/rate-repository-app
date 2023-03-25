import Text from './Text';
import useRepositories from '../hooks/useRepositories';
import { RepositoryListContainer } from './RepositoryListContainer';

const RepositoryList = () => {
  const { repositories, loading, error } = useRepositories();

  if (loading) {
    return <Text>Loading...</Text>
  }
  if (error) {
    return <Text>Error</Text>
  }

  return <RepositoryListContainer repositories={repositories} />;
};

export default RepositoryList;