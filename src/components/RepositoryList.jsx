import { FlatList, View, StyleSheet } from 'react-native';
// import useRepositories from '../hooks/useRepositories';
import RepositoryItem from './RepositoryItem';
import { GET_REPOSITORIES } from '../graphql/queries';
import { useQuery } from '@apollo/client';
import Text from './Text';


const styles = StyleSheet.create({
  separator: {
    height: 10,
    backgroundColor: 'rgb(230, 230, 230)'
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryList = () => {
    // const { repositories } = useRepositories();
  const { data, error, loading } = useQuery(GET_REPOSITORIES,
    {fetchPolicy: 'cache-and-network'}
    );

  if(loading) {
    return <Text>Loading...</Text>
  }

  if(error) {
    return <Text>Error</Text>
  }
  
  const repositoryNodes = data.repositories
    ? data.repositories.edges.map(edge => edge.node)
    : [];

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item: repo }) => <RepositoryItem repository={repo} />}
      keyExtractor={repo => repo.id}
    />
  );
};

export default RepositoryList;