// import Text from './Text';
// import useRepositories from '../hooks/useRepositories';
// import { RepositoryListContainer } from './RepositoryListContainer';
// import { useState } from 'react';

// const RepositoryList = () => {
//   const [orderBy, setOrderBy] = useState('CREATED_AT');
//   const [orderDirection, setOrderDirection] = useState('DESC');
//   const { repositories, loading, error } = useRepositories(orderBy, orderDirection);

//   const [searchKeyword, setSearchKeyword] = useState('');
//   const [debouncedSearchKeyword] = useDebounce(searchKeyword, 500);

//   if (loading) {
//     return <Text>Loading...</Text>
//   }
//   if (error) {
//     console.log(error)
//     return <Text>Error</Text>
//   }

//   const handleOrderChange = (value) => {
//     if (value === "CREATED_AT") {
//       setOrderBy("CREATED_AT");
//       setOrderDirection("DESC");
//     } else if (value === "RATING_AVERAGE_ASC") {
//       setOrderBy("RATING_AVERAGE");
//       setOrderDirection('ASC');
//     } else if (value === "RATING_AVERAGE_DESC") {
//       setOrderBy("RATING_AVERAGE");
//       setOrderDirection('DESC');
//     }
//   };
//   return <RepositoryListContainer repositories={repositories} orderBy={orderBy} handleOrderChange={handleOrderChange} />;
// };

// export default RepositoryList;


import Text from './Text';
import useRepositories from '../hooks/useRepositories';
import { RepositoryListContainer } from './RepositoryListContainer';
import { useState } from 'react';
import { useDebounce } from 'use-debounce';
import { useNavigate } from 'react-router-native';

const RepositoryList = () => {
  const [orderBy, setOrderBy] = useState('CREATED_AT');
  const [orderDirection, setOrderDirection] = useState('DESC');
  
  const [searchKeyword, setSearchKeyword] = useState('');
  const [debouncedSearchKeyword] = useDebounce(searchKeyword, 500);
  const navigate = useNavigate();

  const { repositories, loading, error } = useRepositories(orderBy, orderDirection, debouncedSearchKeyword);

  const navigateToSingleViewRepository = (id) => {
    navigate(`/repository/${id}`);
  };

  const handleOrderChange = (value) => {
    if (value === "CREATED_AT") {
      setOrderBy("CREATED_AT");
      setOrderDirection("DESC");
    } else if (value === "RATING_AVERAGE_ASC") {
      setOrderBy("RATING_AVERAGE");
      setOrderDirection('ASC');
    } else if (value === "RATING_AVERAGE_DESC") {
      setOrderBy("RATING_AVERAGE");
      setOrderDirection('DESC');
    }
  };

  if (loading) {
    return <Text>Loading...</Text>
  }
  if (error) {
    console.log(error)
    return <Text>Error</Text>
  }

  return (
    <>
      <RepositoryListContainer navigateToSingleViewRepository={navigateToSingleViewRepository} repositories={repositories} orderBy={orderBy} handleOrderChange={handleOrderChange} searchKeyword={searchKeyword} setSearchKeyword={setSearchKeyword} />
    </>
  );
};

export default RepositoryList;