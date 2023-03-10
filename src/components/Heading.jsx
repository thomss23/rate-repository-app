import { Image, StyleSheet, View } from "react-native";
import RepositoryInfo from "./RepositoryInfo";

const styles = StyleSheet.create({
    heading: {
        flexDirection: 'row',
        marginTop: 15
    }, 
    avatar: {
        width: 48,
        height: 48,
        marginLeft: 16,
        marginRight: 20
    },
});

const Heading = ({repository}) => {
    return(
        <View style={styles.heading}>
            <Image
            style={styles.avatar}
            source={{
            uri: repository.ownerAvatarUrl
            }}/>
            <RepositoryInfo repository={repository}/>
        </View>
    )
}

export default Heading;