import React from 'react';
import { FlatList, Pressable, StyleSheet, TextInput, View } from 'react-native';
import RepositoryItem from './RepositoryItem';
import { Picker } from '@react-native-picker/picker';

const styles = StyleSheet.create({
  separator: {
    height: 10,
    backgroundColor: 'rgb(230, 230, 230)'
  }, 
  input: {
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    margin: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

export class RepositoryListContainer extends React.Component {
  constructor(props) {
    super(props);
    this.searchInputRef = React.createRef();
  }
  
  renderHeader = () => {
    const { orderBy, handleOrderChange, searchKeyword, setSearchKeyword, searchInputRef, selectedKeyword } = this.props;
    console.log(orderBy)
    return (
      <View>
        <TextInput style={styles.input}
          label="Search"
          value={searchKeyword}
          onChangeText={(text) => {
            setSearchKeyword(text);
          }}
          ref={searchInputRef}
        />
        <Picker selectedValue={selectedKeyword} onValueChange={handleOrderChange}>
          <Picker.Item label="Latest repositories" value="CREATED_AT" />
          <Picker.Item label="Highest rated repositories" value="RATING_AVERAGE_DESC" />
          <Picker.Item label="Lowest rated repositories" value="RATING_AVERAGE_ASC" />
        </Picker>
      </View>
    );
  };

  render() {
    const { repositories, navigateToSingleViewRepository} = this.props;
    const repositoryNodes = repositories ? repositories.edges.map((edge) => edge.node) : [];

    return (
      <FlatList
        data={repositoryNodes}
        ItemSeparatorComponent={ItemSeparator}
        renderItem={({ item: repo }) => {
          return (
            <Pressable onPress={() => navigateToSingleViewRepository(repo.id)}>
              <RepositoryItem repository={repo} />
            </Pressable>
          );
        }}
        ListHeaderComponent={this.renderHeader}
        keyExtractor={(repo) => repo.id}
      />
    );
  }
}