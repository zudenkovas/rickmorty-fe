import { CharacterListResponse, Character, UserFavoriteCharacters } from './types';
import { get, post, getSecurityHeaders } from '../../commons/methods';

export const fetchCharacters = async (page: string): Promise<CharacterListResponse> => {
  const { data } = await get<CharacterListResponse>(`characters?page=${page || 1}`, getSecurityHeaders());
  return data;
};

export const fetchCharacter = async (id: string): Promise<Character> => {
  const { data } = await get<Character>(`characters/${id}`, getSecurityHeaders());
  return data;
};

export const fetchUserFavoriteCharacters = async (userId: string): Promise<UserFavoriteCharacters> => {
  const { data } = await post<{ userId: string }, UserFavoriteCharacters>('characters/favorite/search', { userId }, getSecurityHeaders());
  return data;
};

export const addFavoriteCharacter = async (userId: string, characterId: string): Promise<UserFavoriteCharacters> => {
  const { data } = await post<{ userId: string; characterIds: string[] }, UserFavoriteCharacters>(
    'characters/favorite/add',
    { userId, characterIds: [characterId] },
    getSecurityHeaders(),
  );
  return data;
};

export const deleteFavoriteCharacter = async (userId: string, characterId: string): Promise<UserFavoriteCharacters> => {
  const { data } = await post<{ userId: string; characterIds: string[] }, UserFavoriteCharacters>(
    'characters/favorite/delete',
    { userId, characterIds: [characterId] },
    getSecurityHeaders(),
  );
  return data;
};
