import { createReducer } from '@reduxjs/toolkit';
import { FetchingStatus } from 'commons/enums';

import { getCharacters, getCharacter, getUserFavoriteCharacters, addFavoriteCharacter, removeFavoriteCharacter } from './actions';
import { Character, CharacterListResponse, UserFavoriteCharacters } from './types';

export type CharacterState = {
  charactersListData: CharacterListResponse | null;
  charactersListStatus: FetchingStatus;
  characterDataById: {
    [id: string]: Character;
  } | null;
  characterStatusById: {
    [id: string]: FetchingStatus;
  } | null;
  favoriteCharactersData: UserFavoriteCharacters | null;
  favoriteCharactersStatus: FetchingStatus;
};

const initialState: CharacterState = {
  charactersListData: null,
  charactersListStatus: FetchingStatus.INITIAL,
  characterDataById: null,
  characterStatusById: null,
  favoriteCharactersData: null,
  favoriteCharactersStatus: FetchingStatus.INITIAL,
};

export const authReducer = createReducer(
  initialState,

  (builder) => {
    builder
      .addCase(getCharacters.pending, (state) => ({
        ...state,
        charactersListStatus: FetchingStatus.LOADING,
      }))
      .addCase(getCharacters.fulfilled, (state, action) => ({
        ...state,
        charactersListStatus: FetchingStatus.DONE,
        charactersListData: action.payload,
      }))
      .addCase(getCharacters.rejected, (state) => ({
        ...state,
        charactersListStatus: FetchingStatus.FAILED,
      }))
      .addCase(getCharacter.pending, (state, action) => ({
        ...state,
        characterStatusById: { [action.meta.arg]: FetchingStatus.LOADING },
      }))
      .addCase(getCharacter.fulfilled, (state, action) => ({
        ...state,
        characterStatusById: { [action.meta.arg]: FetchingStatus.LOADING },
        characterDataById: { [action.meta.arg]: action.payload },
      }))
      .addCase(getUserFavoriteCharacters.pending, (state) => ({
        ...state,
        favoriteCharactersStatus: FetchingStatus.LOADING,
      }))
      .addCase(getUserFavoriteCharacters.fulfilled, (state, action) => ({
        ...state,
        favoriteCharactersStatus: FetchingStatus.DONE,
        favoriteCharactersData: action.payload,
      }))
      .addCase(getUserFavoriteCharacters.rejected, (state) => ({
        ...state,
        favoriteCharactersStatus: FetchingStatus.FAILED,
      }))
      .addCase(addFavoriteCharacter.pending, (state) => ({
        ...state,
        favoriteCharactersStatus: FetchingStatus.LOADING,
      }))
      .addCase(addFavoriteCharacter.rejected, (state) => ({
        ...state,
        favoriteCharactersStatus: FetchingStatus.FAILED,
      }))
      .addCase(addFavoriteCharacter.fulfilled, (state, action) => ({
        ...state,
        favoriteCharactersStatus: FetchingStatus.DONE,
        favoriteCharactersData: action.payload,
      }))
      .addCase(removeFavoriteCharacter.pending, (state) => ({
        ...state,
        favoriteCharactersStatus: FetchingStatus.LOADING,
      }))
      .addCase(removeFavoriteCharacter.rejected, (state) => ({
        ...state,
        favoriteCharactersStatus: FetchingStatus.FAILED,
      }))
      .addCase(removeFavoriteCharacter.fulfilled, (state, action) => ({
        ...state,
        favoriteCharactersStatus: FetchingStatus.DONE,
        favoriteCharactersData: action.payload,
      }));
  },
);

export default authReducer;
