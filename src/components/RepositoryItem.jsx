import { View } from 'react-native';
import Heading from './Heading';
import RepositoryCountSection from './RepositoryCountSection';

const RepositoryItem = ({repository}) => {
    return(
        <View>
            <Heading repository={repository}/>
            <RepositoryCountSection repository={repository}/>
        </View>
    )
}

export default RepositoryItem;