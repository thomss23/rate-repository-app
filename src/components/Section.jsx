import { StyleSheet, View } from "react-native"
import Text from "./Text"

const styles = StyleSheet.create({
    section: {
        //TODO: COMPLETE THIS
    },
    name: {
        paddingTop: 5,
        paddingBottom: 10
    },
    count: {
        alignSelf:'center'
    }
});

const addSeparatorToNumber = (num) => {
    num = num.toString().replace(/[^0-9.]/g, '');
    if (num < 1000) {
        return num;
    }
    let si = [
      {v: 1E3, s: "K"},
      {v: 1E6, s: "M"},
      {v: 1E9, s: "B"},
      {v: 1E12, s: "T"},
      {v: 1E15, s: "P"},
      {v: 1E18, s: "E"}
      ];
    let index;
    for (index = si.length - 1; index > 0; index--) {
        if (num >= si[index].v) {
            break;
        }
    }
    return (num / si[index].v).toFixed(1).replace(/\.0+$|(\.[0-9]*[1-9])0+$/, "$1") + si[index].s;
}

const Section = ({count, name}) => {
    let formattedCount = addSeparatorToNumber(count);
    return (
        <View style={styles.section}>
            <Text style={styles.count} fontWeight='bold'>{formattedCount}</Text>
            <Text style={styles.name}>{name}</Text>
        </View>
    )
}

export default Section;