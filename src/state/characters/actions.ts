import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosErrorResponse } from 'commons/types';
import { RejectValue } from 'state/types';

import {
  fetchCharacters,
  fetchCharacter,
  fetchUserFavoriteCharacters,
  addFavoriteCharacter as addCharacterToFavorites,
  deleteFavoriteCharacter,
} from './apiActions';
import { AddUserFavoriteCharacter, Character, CharacterListResponse, UserFavoriteCharacters } from './types';

export const getCharacters = createAsyncThunk<CharacterListResponse, string, RejectValue>('characters', async (page: string, { rejectWithValue }) => {
  try {
    const response = await fetchCharacters(page);
    return response;
  } catch (err) {
    const error = err as AxiosErrorResponse;
    if (!error.response) {
      throw error;
    }

    return rejectWithValue(error.response?.data);
  }
});

export const getCharacter = createAsyncThunk<Character, string, RejectValue>('character', async (id: string, { rejectWithValue }) => {
  try {
    const response = await fetchCharacter(id);
    return response;
  } catch (err) {
    const error = err as AxiosErrorResponse;
    if (!error.response) {
      throw error;
    }

    return rejectWithValue(error.response?.data);
  }
});

export const getUserFavoriteCharacters = createAsyncThunk<UserFavoriteCharacters, string, RejectValue>(
  'userFavoriteCharacters',
  async (userId: string, { rejectWithValue }) => {
    try {
      const response = await fetchUserFavoriteCharacters(userId);
      return response;
    } catch (err) {
      const error = err as AxiosErrorResponse;
      if (!error.response) {
        throw error;
      }

      return rejectWithValue(error.response?.data);
    }
  },
);

export const addFavoriteCharacter = createAsyncThunk<UserFavoriteCharacters, AddUserFavoriteCharacter, RejectValue>(
  'addFavoriteCharacter',
  async ({ userId, characterId }: AddUserFavoriteCharacter, { rejectWithValue }) => {
    try {
      const response = await addCharacterToFavorites(userId, characterId);
      return response;
    } catch (err) {
      const error = err as AxiosErrorResponse;
      if (!error.response) {
        throw error;
      }

      return rejectWithValue(error.response?.data);
    }
  },
);

export const removeFavoriteCharacter = createAsyncThunk<UserFavoriteCharacters, AddUserFavoriteCharacter, RejectValue>(
  'removeFavoriteCharacter',
  async ({ userId, characterId }: AddUserFavoriteCharacter, { rejectWithValue }) => {
    try {
      const response = await deleteFavoriteCharacter(userId, characterId);
      return response;
    } catch (err) {
      const error = err as AxiosErrorResponse;
      if (!error.response) {
        throw error;
      }

      return rejectWithValue(error.response?.data);
    }
  },
);
