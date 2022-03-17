export type Character = {
  id: number;
  name: string;
  status: CharacterStatus;
  species: string;
  type: string;
  gender: CharacterGender;
  origin: { name: string; url: string };
  location: { name: string; url: string };
  image: string;
  episode: string[];
  url: string[];
  created: string;
};

export enum CharacterStatus {
  ALIVE = 'Alive',
  DEAD = 'Dead',
  UNKNOWN = 'unknown',
}

export enum CharacterGender {
  FEMALE = 'Female',
  MALE = 'Male',
  GENDERLESS = 'Genderless',
  UNKNOWN = 'unknown',
}

export type CharacterListResponse = {
  info: { count: number; pages: number; current: string; next: string | null; prev: string | null };
  results: Character[];
};

export type UserFavoriteCharacters = {
  id: string;
  userId: string;
  characterIds: string[];
};

export type AddUserFavoriteCharacter = {
  userId: string;
  characterId: string;
};
