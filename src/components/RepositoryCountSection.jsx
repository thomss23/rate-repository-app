import { StyleSheet, View } from "react-native";
import Section from "./Section";

const styles = StyleSheet.create({
    reviewSection: {
        flexDirection: 'row',
        justifyContent: 'space-around'
    },

});

const RepositoryCountSection = ({repository}) => {
    return(
        <View testID="reviewSection" style={styles.reviewSection}>
            <Section testID="stargazersCount" count={repository.stargazersCount} name='Stars'></Section>
            <Section testID="forksCount" count={repository.forksCount} name='Forks'></Section>
            <Section testID="reviewCount" count={repository.reviewCount} name='Reviews'></Section>
            <Section testID="ratingAverage" count={repository.ratingAverage} name='Rating'></Section>
        </View>
    )
}

export default RepositoryCountSection;