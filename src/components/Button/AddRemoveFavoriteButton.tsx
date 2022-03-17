import Button from './Button';

type FavoriteProps = {
  isAdd: boolean;
  onClick: () => void;
};

const TEXT = {
  Favorite: 'Add to favorites',
  Unfavorite: 'Remove from favorites',
};

const AddRemoveFavoriteButton = ({ isAdd, onClick }: FavoriteProps): JSX.Element => {
  return <Button onClick={onClick}>{isAdd ? TEXT.Favorite : TEXT.Unfavorite}</Button>;
};

export default AddRemoveFavoriteButton;
