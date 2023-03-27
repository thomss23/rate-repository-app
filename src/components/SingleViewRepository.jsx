import { useQuery } from "@apollo/client";
import { Pressable, StyleSheet, View } from "react-native";
import { useParams } from "react-router-native";
import { GET_SINGLE_REPOSITORY } from "../graphql/queries";
import Heading from "./Heading";
import ReviewSection from "./ReviewSection";
import Text from "./Text";
import * as Linking from 'expo-linking';


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
  });

const SingleViewRepository = () => {
    const repositoryId = useParams().id

    const { loading, error, data } = useQuery(GET_SINGLE_REPOSITORY, {
        variables: { repositoryId },
        fetchPolicy: 'cache-and-network',
      });
    
      if (loading) {
        return <Text>Loading...</Text>;
      }
    
      if (error) {
        return <Text>Error: {error.message}</Text>;
      }
    
    const repository = data.repository;

    const visitGithubLink = () => {
        Linking.openURL(repository.url);
    }
    return(    
        <View>
            <Heading repository={repository}/>
            <ReviewSection repository={repository}/>
            <Pressable onPress={visitGithubLink}>
                <View style={styles.submit}>
                    <Text style={styles.submitText}>Open in Github</Text>
                </View>
            </Pressable>
        </View>
    )

}

export default SingleViewRepository;