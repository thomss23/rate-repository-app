import {Image, StyleSheet, View } from 'react-native';
import Text from './Text';

const styles = StyleSheet.create({
    separator: {
      height: 10,
    },
    avatar: {
        width: 48,
        height: 48,
        marginLeft: 16
    }
});

const RepositoryItem = ({repository}) => {
    return(
        <View>
            <Image
            style={styles.avatar}
            source={{
            uri: repository.ownerAvatarUrl
            }}/>
            <Text>Full name : {repository.fullName}</Text>
            <Text>Description: {repository.description}</Text>
            <Text>Language: {repository.language}</Text>
            <Text>Stars: {repository.stargazersCount}</Text>
            <Text>Forks: {repository.forksCount}</Text>
            <Text>Reviews: {repository.reviewCount}</Text>
            <Text>Rating: {repository.ratingAverage}</Text>
        </View>
    )
}

export default RepositoryItem;