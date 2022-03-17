import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'state/hooks';
import { selectAuth } from 'state/auth/selectors';
import { addFavoriteCharacter, getCharacter, getUserFavoriteCharacters, removeFavoriteCharacter } from 'state/characters/actions';
import { selectCharacterById, selectCharacterByIdStatus, selectFavoriteCharactersData, selectFavoriteCharactersStatus } from 'state/characters/selectors';
import { FetchingStatus } from 'commons/enums';
import { AddRemoveButton } from 'components/Button';
import { StarIcon } from 'components/Icons';
import Loader from 'components/Loader';
import { DescriptionList, DescriptionListItem } from 'components/DescriptionList';
import { Heading2 } from 'components/Typography';

import styles from './CharacterContainer.module.css';

const TEXT = {
  Species: 'Species:',
  Origin: 'Origin:',
  Gender: 'Gender:',
  Status: 'Status:',
  Type: 'Type:',
  EpisodeCount: 'Episode count:',
};

const formatDate = (dateString?: string): string => (dateString ? new Date(dateString).toLocaleDateString() : '-');

const dashIfEmpty = (value?: string | number): string | number => (value ? value : '-');

const CharacterContainer = (): JSX.Element => {
  const params = useParams<'id'>();
  const { userData } = useAppSelector(selectAuth);
  const dispatch = useAppDispatch();
  const character = useAppSelector(selectCharacterById(params.id || ''));
  const characterStatus = useAppSelector(selectCharacterByIdStatus(params.id || ''));
  const favoriteCharactersData = useAppSelector(selectFavoriteCharactersData);
  const favoriteCharactersStatus = useAppSelector(selectFavoriteCharactersStatus);
  const isFavorite = !!favoriteCharactersData?.characterIds.includes(`${character?.id}`);

  const handleCharacterAction = async () => {
    const userId = userData?.user.id;
    const characterId = `${character?.id}`;

    if (userId && characterId) {
      isFavorite ? dispatch(removeFavoriteCharacter({ userId, characterId })) : dispatch(addFavoriteCharacter({ userId, characterId }));
    }
  };

  useEffect(() => {
    if (params.id) {
      dispatch(getCharacter(params.id));
    }

    if (userData?.user.id) {
      dispatch(getUserFavoriteCharacters(userData.user.id));
    }
  }, [params.id, userData?.user.id]);

  if ([characterStatus, favoriteCharactersStatus].includes(FetchingStatus.LOADING)) {
    <Loader />;
  }

  return (
    <div className={styles.characterInfoWrapper}>
      <section className={styles.characterSection}>
        <img alt={`${character?.name}-character`} className={styles.characterImage} src={character?.image} />

        <div className={styles.characterDataWrapper}>
          <div className={styles.characterTitleWrapper}>
            <Heading2>{character?.name}</Heading2>
            <span className={styles.characterCreatedDate}>{`(${formatDate(character?.created)})`}</span>
            {isFavorite && <StarIcon />}
          </div>

          <DescriptionList>
            <DescriptionListItem details={dashIfEmpty(character?.species)} title={TEXT.Species} />
            <DescriptionListItem details={dashIfEmpty(character?.origin.name)} title={TEXT.Origin} />
            <DescriptionListItem details={dashIfEmpty(character?.gender)} title={TEXT.Gender} />
            <DescriptionListItem details={dashIfEmpty(character?.status)} title={TEXT.Status} />
            <DescriptionListItem details={dashIfEmpty(character?.type)} title={TEXT.Type} />
            <DescriptionListItem details={dashIfEmpty(character?.episode.length)} title={TEXT.EpisodeCount} />
          </DescriptionList>
          <AddRemoveButton isAdd={!isFavorite} onClick={handleCharacterAction} />
        </div>
      </section>
    </div>
  );
};

export default CharacterContainer;
