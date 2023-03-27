import { FlatList, Pressable, StyleSheet, View } from "react-native";
import RepositoryItem from "./RepositoryItem";
import { useNavigate } from "react-router-native";

const styles = StyleSheet.create({
    separator: {
      height: 10,
      backgroundColor: 'rgb(230, 230, 230)'
    },
});

const ItemSeparator = () => <View style={styles.separator} />;

export const RepositoryListContainer = ({ repositories }) => {
  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];
  const navigate = useNavigate();

  const navigateToSingleViewRepository = (id) => {
    navigate(`/repository/${id}`)
  }
  
  return (
      <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item: repo }) => {
        return(
        <Pressable onPress={() => navigateToSingleViewRepository(repo.id)}>
          <RepositoryItem repository={repo}/>
        </Pressable>
        );
      }}
      keyExtractor={repo => repo.id}
    />
  );
};