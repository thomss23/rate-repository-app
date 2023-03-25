import { View } from 'react-native';
import Heading from './Heading';
import ReviewSection from './ReviewSection';

const RepositoryItem = ({repository}) => {
    return(
        <View>
            <Heading repository={repository}/>
            <ReviewSection repository={repository}/>
        </View>
    )
}

export default RepositoryItem;