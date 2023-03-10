import { StyleSheet, View } from "react-native";
import Text from "./Text";

const styles = StyleSheet.create({
    repoName:{
        paddingBottom: 5
    },
    repoDescription:{
        paddingBottom: 5,
        width: 300
    },
    repoLanguage:{
        backgroundColor: '#0366d6',
        borderRadius: 10,
        paddingVertical: 5,
        paddingHorizontal: 8,
        marginRight: 8,
        fontSize: 14,
        lineHeight: 14,
        color: 'white',
        flexShrink: 1,
        fontWeight: 'bold',
        marginBottom: 10
    },

});
const RepositoryInfo = ({repository}) => {
 return(
    <View style={styles.repoInfo}>
        <Text style={styles.repoName} color='title' fontWeight='bold' fontSize='subheading'>{repository.fullName}</Text>
        <Text style={styles.repoDescription}>{repository.description}</Text>
        <View style={{ flexDirection: 'row' }}>
            <Text style={styles.repoLanguage}>{repository.language}</Text>
        </View>
    </View>
 )
}

export default RepositoryInfo;