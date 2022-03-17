import { Link, generatePath } from 'react-router-dom';
import { DescriptionList, DescriptionListItem } from 'components/DescriptionList';
import { StarIcon } from 'components/Icons';
import { Heading2 } from 'components/Typography';
import { RouteKey } from 'navigation';
import { Character, CharacterStatus } from 'state/characters/types';
import { combineClassNames } from 'utils/theme/styleUtils';

import styles from './CharacterCard.module.css';

const TEXT = {
  Origin: 'Origin:',
  Species: 'Species:',
  Gender: 'Gender:',
};

type CharacterCardProps = {
  isFavorite?: boolean;
  character: Character;
};

const getStatusIconClass = (status: CharacterStatus): string => {
  switch (status) {
    case CharacterStatus.ALIVE:
      return styles.aliveStatus;
    case CharacterStatus.DEAD:
      return styles.deadStatus;
    default:
      return styles.unknownStatus;
  }
};

const CharacterCard = ({ character, isFavorite }: CharacterCardProps): JSX.Element => {
  const { name, id, image, origin, species, gender } = character;
  const characterLink = generatePath(RouteKey.Character, { id: `${id}` });

  return (
    <article className={styles.characterCardWrapper}>
      <img alt={`${name}-character`} className={styles.characterImage} loading="lazy" src={image} />

      <div className={styles.characterInfoWrapper}>
        <Link className={styles.characterLink} to={characterLink}>
          <Heading2>{name}</Heading2>
          {isFavorite && <StarIcon />}
        </Link>

        <p className={styles.characterStatusWrapper}>
          <span className={combineClassNames([styles.characterStatus, getStatusIconClass(character.status)])}></span>
          <span>{`${character.status} - ${character.species}`}</span>
        </p>

        <DescriptionList>
          <DescriptionListItem details={origin.name} title={TEXT.Origin} />
          <DescriptionListItem details={species} title={TEXT.Species} />
          <DescriptionListItem details={gender} title={TEXT.Gender} />
        </DescriptionList>
      </div>
    </article>
  );
};

export default CharacterCard;
