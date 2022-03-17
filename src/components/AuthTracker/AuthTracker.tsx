import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import jwt from 'jwt-decode';
import { useAppDispatch, useAppSelector } from 'state/hooks';
import { TOKEN_KEY } from 'commons/constants';
import { selectAuth } from 'state/auth/selectors';
import { persistAuth } from 'state/auth/actions';
import { RouteKey } from 'navigation';

type AuthTrackerProps = {
  children: JSX.Element;
};

const AuthTracker = ({ children }: AuthTrackerProps) => {
  const { isLoggedIn } = useAppSelector(selectAuth);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const token = localStorage.getItem(TOKEN_KEY);

    if (token && !isLoggedIn) {
      const decoded = jwt(token) as { data: { id: string; email: string } };
      dispatch(persistAuth({ token, user: decoded.data }));
    }

    if (!token && !isLoggedIn) {
      navigate(RouteKey.Index, { replace: true });
    }
  }, []);

  return children;
};

export default AuthTracker;
