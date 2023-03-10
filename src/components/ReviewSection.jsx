import { StyleSheet, View } from "react-native";
import Section from "./Section";

const styles = StyleSheet.create({
    reviewSection: {
        flexDirection: 'row',
        justifyContent: 'space-around'
    },

});

const ReviewSection = ({repository}) => {
    return(
        <View style={styles.reviewSection}>
            <Section count={repository.stargazersCount} name='Stars'></Section>
            <Section count={repository.forksCount} name='Forks'></Section>
            <Section count={repository.reviewCount} name='Reviews'></Section>
            <Section count={repository.ratingAverage} name='Rating'></Section>
        </View>
    )
}

export default ReviewSection;