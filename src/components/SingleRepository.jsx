import { useQuery } from "@apollo/client";
import { FlatList, Pressable, StyleSheet, View } from "react-native";
import { useParams } from "react-router-native";
import { GET_SINGLE_REPOSITORY } from "../graphql/queries";
import Heading from "./Heading";
import RepositoryCountSection from "./RepositoryCountSection";
import Text from "./Text";
import * as Linking from 'expo-linking';
import ReviewItem from "./ReviewItem";

const styles = StyleSheet.create({
    submit: {
      backgroundColor: 'blue',
      paddingHorizontal: 20,
      paddingVertical: 10,
      width: '95%',
      alignSelf: 'center',
      margin: 12,
      borderWidth: 1,
      borderColor: 'blue',
    },
    submitText: {
      color: 'white',
      fontSize: 16,
      fontWeight: 'bold',
      textAlign: 'center',
    },
    separator: {
      height: 10,
      backgroundColor: 'rgb(230, 230, 230)'
    },
    reviewContainer: {
      flexDirection: 'row',
      marginTop: 10,
    },
    rating: {
      width: 45,
      height: 45,
      borderRadius: 45 / 2,
      color: 'blue',
      alignItems: 'center',
      textAlign: 'center',
      borderWidth: 1,
      borderColor: "blue",
      marginLeft: 10,
    },
    ratingText: {
      paddingTop: 13,
      fontWeight: '700',
      fontSize: 16,
      color: 'blue'
    },
    reviewDetailsContainer: {
      marginLeft: 10,
    },
    username: {
      fontWeight: '700'
    },
    created: {
      marginTop:3,
      color: "#2d2e2d"
    },
    text: {
      marginTop:5,
      marginBottom: 10,
    },
    textContainer: {
      width: '90%'

    }
});

const SingleRepositoryInfo = ({ repository }) => {

    const visitGithubLink = () => {
        Linking.openURL(repository.url);
    }

    return(    
        <View>
            <Heading repository={repository}/>
            <RepositoryCountSection repository={repository}/>
            <Pressable onPress={visitGithubLink}>
                <View style={styles.submit}>
                    <Text style={styles.submitText}>Open in Github</Text>
                </View>
            </Pressable>
        </View>
    )
  };
  
  const ItemSeparator = () => <View style={styles.separator} />;

  const SingleRepository = () => {

    const repositoryId = useParams().id
    const first = 2;
    const { loading, error, data, fetchMore } = useQuery(GET_SINGLE_REPOSITORY, {
        variables: { repositoryId, first},
        fetchPolicy: 'cache-and-network',
    });

  
    
    if (loading) {
        return <Text>Loading...</Text>;
    }

    if (error) {
        return <Text>Error: {error.message}</Text>;
    }

    const repository = data.repository;
    const reviews = data.repository.reviews.edges;

    const onEndReach = () => {
      console.log("Reached end of the reviews")
      const reviews = data?.repository?.reviews;
      const pageInfo = reviews?.pageInfo;

      if (!pageInfo.hasNextPage) return;
  
      fetchMore({
        variables: {
          after: pageInfo.endCursor,
        },
      });
    };

    
    return (
      <FlatList
        data={reviews}
        renderItem={({ item }) => <ReviewItem review={item.node} />}
        keyExtractor={item  => item.node.id}
        ListHeaderComponent={() => <SingleRepositoryInfo repository={repository} />}
        ItemSeparatorComponent={ItemSeparator}
        onEndReached={onEndReach}
        onEndReachedThreshold={0.5}
      />
    );
  };
  

export default SingleRepository;