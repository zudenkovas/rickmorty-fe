import { generatePath, useNavigate } from 'react-router-dom';
import NavLink from 'components/Link/NavLink';
import Button from 'components/Button';
import { useAppSelector, useAppDispatch } from 'state/hooks';
import { selectAuth } from 'state/auth/selectors';
import { signOut } from 'state/auth/actions';
import { RouteKey } from 'navigation';

const TEXT = {
  SignInUp: 'Sign in/up',
  SignOut: 'Sign out',
};
export const HeaderNavigation = (): JSX.Element | null => {
  const auth = useAppSelector(selectAuth);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleSignOut = () => {
    dispatch(signOut());
    navigate(RouteKey.Index, { replace: true });
  };

  return (
    <nav>
      {auth.isLoggedIn ? (
        <Button secondary onClick={handleSignOut}>
          {TEXT.SignOut}
        </Button>
      ) : (
        <NavLink to={generatePath(RouteKey.Index)}>{TEXT.SignInUp}</NavLink>
      )}
    </nav>
  );
};
