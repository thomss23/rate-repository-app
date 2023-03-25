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
    <View testID="repositoryInfo" style={styles.repoInfo}>
        <Text testID='name' style={styles.repoName} color='title' fontWeight='bold' fontSize='subheading'>{repository.fullName}</Text>
        <Text testID='description' style={styles.repoDescription}>{repository.description}</Text>
        <View style={{ flexDirection: 'row' }}>
            <Text testID='language' style={styles.repoLanguage}>{repository.language}</Text>
        </View>
    </View>
 )
}

export default RepositoryInfo;