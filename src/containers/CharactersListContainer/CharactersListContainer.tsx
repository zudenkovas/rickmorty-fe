import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from 'state/hooks';
import { FetchingStatus } from 'commons/enums';
import Loader from 'components/Loader';
import Pagination from 'components/Pagination';
import { selectAuth } from 'state/auth/selectors';
import { getCharacters, getUserFavoriteCharacters } from 'state/characters/actions';
import { selectCharactersListData, selectCharactersListStatus, selectFavoriteCharactersData, selectFavoriteCharactersStatus } from 'state/characters/selectors';

import CharacterCard from './CharacterCard';
import styles from './CharactersListContainer.module.css';

const CharactersListContainer = (): JSX.Element => {
  const { userData } = useAppSelector(selectAuth);
  const charactersListData = useAppSelector(selectCharactersListData);
  const charactersListStatus = useAppSelector(selectCharactersListStatus);
  const favoriteCharactersData = useAppSelector(selectFavoriteCharactersData);
  const favoriteCharactersStatus = useAppSelector(selectFavoriteCharactersStatus);
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useAppDispatch();

  const activePage = parseInt(searchParams.get('page') || '1');

  const totalPages = 0;

  useEffect(() => {
    if (userData?.user.id) {
      dispatch(getUserFavoriteCharacters(userData.user.id));
    }
  }, [userData]);

  useEffect(() => {
    dispatch(getCharacters(`${activePage}`));
  }, [activePage]);

  const handleNextClick = () => {
    const nextPage = activePage === totalPages ? activePage : activePage + 1;
    setSearchParams({ page: `${nextPage}` });
  };

  const handlePrevClick = () => {
    const prevPage = activePage === 1 ? activePage : activePage - 1;

    setSearchParams({ page: `${prevPage}` });
  };

  const handlePageClick = (page: number) => {
    setSearchParams({ page: `${page}` });
  };

  return (
    <>
      <div className={styles.charactersListContainer}>
        {[charactersListStatus, favoriteCharactersStatus].includes(FetchingStatus.LOADING) ? (
          <Loader />
        ) : (
          charactersListData?.results.map((character, index) => (
            <CharacterCard
              character={character}
              isFavorite={!!favoriteCharactersData?.characterIds.includes(`${character.id}`)}
              key={`character-${character.id}-${index}`}
            />
          ))
        )}
      </div>

      <Pagination
        currentPage={+(charactersListData?.info.current || '')}
        totalPages={+(charactersListData?.info.pages || '')}
        onNextClick={handleNextClick}
        onPageClick={handlePageClick}
        onPrevClick={handlePrevClick}
      />
    </>
  );
};

export default CharactersListContainer;
