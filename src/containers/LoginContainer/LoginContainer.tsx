import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'state/hooks';
import { FetchingStatus } from 'commons/enums';
import LoginForm from 'components/LoginForm';
import { Heading1 } from 'components/Typography';
import { SignInCredentials, SignUpCredentials } from 'state/auth/types';
import { signUp, signIn } from 'state/auth/actions';
import { selectAuth } from 'state/auth/selectors';
import { RouteKey } from 'navigation';

import styles from './LoginContainer.module.css';

const TEXT = {
  signInTitle: 'Please Sign in',
  signUpTitle: 'Please Sign up',
};

const LoginContainer = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const { isLoggedIn, error, signUpStatus } = useAppSelector(selectAuth);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (signUpStatus === FetchingStatus.DONE) {
      setIsSignInForm(true);
    }
  }, [signUpStatus]);

  if (isLoggedIn) {
    return <Navigate to={RouteKey.Characters} replace />;
  }

  const handleFormChange = () => {
    setIsSignInForm((prev) => !prev);
  };

  const handleSubmit = (values: SignInCredentials | SignUpCredentials) => {
    if (isSignInForm) {
      dispatch(signIn(values));
    } else {
      dispatch(signUp(values as SignUpCredentials));
    }
  };

  return (
    <div className={styles.loginContainer}>
      <Heading1>{isSignInForm ? TEXT.signInTitle : TEXT.signUpTitle}</Heading1>
      <LoginForm error={error} isSignInForm={isSignInForm} onFormTypeChange={handleFormChange} onSubmit={handleSubmit} />
    </div>
  );
};

export default LoginContainer;
