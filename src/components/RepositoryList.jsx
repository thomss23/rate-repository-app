import Text from './Text';
import useRepositories from '../hooks/useRepositories';
import { RepositoryListContainer } from './RepositoryListContainer';
import { useEffect, useRef, useState } from 'react';
import { useDebounce } from 'use-debounce';
import { useNavigate } from 'react-router-native';

const RepositoryList = () => {
  const [orderBy, setOrderBy] = useState('CREATED_AT');
  const [orderDirection, setOrderDirection] = useState('DESC');
  const [selectedKeyword, setSelectedKeyword] = useState('CREATED_AT');
  const [searchKeyword, setSearchKeyword] = useState('');
  const [debouncedSearchKeyword] = useDebounce(searchKeyword, 500);
  const navigate = useNavigate();

  const { repositories, loading, error, fetchMore} = useRepositories(orderBy, orderDirection, debouncedSearchKeyword, 3);

  const navigateToSingleViewRepository = (id) => {
    navigate(`/repository/${id}`);
  };

  const handleOrderChange = (value) => {
    if (value === "CREATED_AT") {
      setOrderBy("CREATED_AT");
      setOrderDirection("DESC");
      setSelectedKeyword("CREATED_AT")
    } else if (value === "RATING_AVERAGE_ASC") {
      setOrderBy("RATING_AVERAGE");
      setOrderDirection('ASC');
      setSelectedKeyword("RATING_AVERAGE_ASC")
    } else if (value === "RATING_AVERAGE_DESC") {
      setOrderBy("RATING_AVERAGE");
      setOrderDirection('DESC');
      setSelectedKeyword("RATING_AVERAGE_DESC")
    }
  };

  const searchInputRef = useRef(null);

  useEffect(() => {
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [repositories]);

  if (loading) {
    return <Text>Loading...</Text>
  }
  if (error) {
    console.log(error)
    return <Text>Error</Text>
  }

  const onEndReach = () => {
    console.log('You have reached the end of the list');
    fetchMore();
  };

  return (
    <RepositoryListContainer onEndReach={onEndReach} selectedKeyword={selectedKeyword} searchInputRef={searchInputRef} navigateToSingleViewRepository={navigateToSingleViewRepository} repositories={repositories} handleOrderChange={handleOrderChange} searchKeyword={searchKeyword} setSearchKeyword={setSearchKeyword} />
  );
};

export default RepositoryList;