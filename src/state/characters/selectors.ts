import { RootState } from '../store';

export const selectCharactersListData = (state: RootState) => state.characters.charactersListData;
export const selectCharactersListStatus = (state: RootState) => state.characters.charactersListStatus;
export const selectCharacterById = (id: string) => (state: RootState) => state.characters.characterDataById?.[id];
export const selectCharacterByIdStatus = (id: string) => (state: RootState) => state.characters.characterStatusById?.[id];
export const selectFavoriteCharactersData = (state: RootState) => state.characters.favoriteCharactersData;
export const selectFavoriteCharactersStatus = (state: RootState) => state.characters.favoriteCharactersStatus;
