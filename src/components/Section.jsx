import { StyleSheet, View } from "react-native"
import { addSeparatorToNumber } from "../utils/mathHelpers";
import Text from "./Text"

const styles = StyleSheet.create({
    name: {
        paddingTop: 5,
        paddingBottom: 10
    },
    count: {
        alignSelf:'center'
    }
});

const Section = ({count, name, testID}) => {
    let formattedCount = addSeparatorToNumber(count);
    return (
        <View testID={testID} style={styles.section}>
            <Text testID="count" style={styles.count} fontWeight='bold'>{formattedCount}</Text>
            <Text style={styles.name}>{name}</Text>
        </View>
    )
}

export default Section;