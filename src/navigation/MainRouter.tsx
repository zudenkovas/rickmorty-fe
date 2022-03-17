import { Routes, Route } from 'react-router-dom';
import CharactersListContainer from 'containers/CharactersListContainer';
import CharacterContainer from 'containers/CharacterContainer';
import LoginContainer from 'containers/LoginContainer';
import NotFoundContainer from 'containers/NotFoundContainer';

import { RouteKey } from './routes';

export const MainRouter = (): JSX.Element => (
  <Routes>
    <Route element={<CharacterContainer />} path={RouteKey.Character} />
    <Route element={<CharactersListContainer />} path={RouteKey.Characters} />
    <Route element={<LoginContainer />} path={RouteKey.Index} />
    <Route element={<NotFoundContainer />} path={RouteKey.NotFound} />
  </Routes>
);
