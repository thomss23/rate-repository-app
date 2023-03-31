import { useMutation } from "@apollo/client";
import { Alert, Button, StyleSheet } from "react-native";
import { View } from "react-native";
import { useNavigate } from "react-router-native";
import { DELETE_REVIEW } from "../graphql/mutations";
import { formatDate } from "../utils/dateUtils";
import Text from "./Text";

const styles = StyleSheet.create({
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
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 5
    },
});



const ReviewItem = ({ review, refetch }) => {
    console.log(review.id)
    const [deleteReview] = useMutation(DELETE_REVIEW, {
        onError: (error) => {
          console.log(error);
        }
      });
    const navigate = useNavigate();

    const handleViewRepository = () => {
        navigate(`/repository/${review.repository.id}`);
      };
    
      const handleDeleteReview = () => {
        Alert.alert(
          'Delete review',
          'Are you sure you want to delete this review?',
          [
            { text: 'Cancel', style: 'cancel' },
            {
              text: 'Delete',
              onPress: async () => {
                await deleteReview({ variables: { id: review.id } });
                refetch()
              },
              style: 'destructive'
            }
          ]
        );
      };
    
    return(
      <View style={styles.reviewContainer}>

        <View style={styles.rating}>
          <Text style={styles.ratingText}>{review.rating}</Text>
        </View>

        <View style={styles.reviewDetailsContainer}>
          {review.repository ? <Text style={styles.username}>{review.repository.fullName}</Text> : <Text style={styles.username}>{review.user.username}</Text>}
          <Text style={styles.created}>{formatDate(review.createdAt)}</Text>
          <View style={styles.textContainer}>
            <Text style={styles.text}>{review.text}</Text>
          </View>
            {review.repository 
            ?          
            <View style={styles.buttonContainer}>
                <Button title="View repository" onPress={handleViewRepository} color="blue"/>
                <Button title="Delete review" onPress={handleDeleteReview} color="red"/>
            </View> 
            : 
            '' 
            }

          
        </View>
      </View>
    )
};

export default ReviewItem;