import { useQuery } from "@apollo/client";
import { FlatList, StyleSheet, View } from "react-native";
import { ME } from "../graphql/queries";
import ReviewItem from "./ReviewItem";
import Text from "./Text";

const styles = StyleSheet.create({
    container: {
      marginHorizontal: 10,
      marginVertical: 5,
    }
});

const UserReviews = () => {
    const { data, loading, refetch } = useQuery(ME, {
        fetchPolicy: 'cache-and-network',
        variables: { includeReviews: true }
    });


    if (loading) {
        return <Text>Loading...</Text>;
    }
    
    const user = data?.me;
    
    return (
        <View style={styles.container}>
            <FlatList
            data={user.reviews.edges}
            keyExtractor={({ node }) => node.id}
            renderItem={({ item }) => <ReviewItem review={item.node} refetch={refetch}/>}
            ListEmptyComponent={<Text>No reviews yet.</Text>}
            />
        </View>
    );
    
};

export default UserReviews;