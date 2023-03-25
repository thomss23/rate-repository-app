import { FlatList, StyleSheet, View } from "react-native";
import RepositoryItem from "./RepositoryItem";

const styles = StyleSheet.create({
    separator: {
      height: 10,
      backgroundColor: 'rgb(230, 230, 230)'
    },
});

const ItemSeparator = () => <View style={styles.separator} />;

export const RepositoryListContainer = ({ repositories }) => {
   console.log("REPOSITORIES:", repositories)
    const repositoryNodes = repositories
      ? repositories.edges.map((edge) => edge.node)
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