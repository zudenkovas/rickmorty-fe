import { forwardRef } from 'react';
import { Formik, Form, FormikProps } from 'formik';
import * as Yup from 'yup';
import TextInputField from 'components/TextInputField';
import Button from 'components/Button';

import styles from './LoginForm.module.css';

const TEXT = {
  FullNameFieldLabel: 'Full name',
  FullNameFieldPlaceHolder: 'Enter full name',
  EmailFieldLabel: 'Email',
  EmailFieldPlaceHolder: 'Enter email',
  PasswordFieldLabel: 'Password',
  PasswordFieldPlaceHolder: 'Enter password',
  NotAUserYet: 'Not a user yet?',
  AlreadyAUser: 'Already a user?',
  SignIn: 'Sign in!',
  SignUp: 'Sign up!',
};

type LoginFormProps = {
  onSubmit: (values: LoginFormValues) => void;
  error?: string;
  isSignInForm: boolean;
  onFormTypeChange: () => void;
};

export type LoginFormValues = {
  name?: string;
  email: string;
  password: string;
};

const formValidationSchema = (isSignInFrom?: boolean) =>
  Yup.object({
    ...(!isSignInFrom && { name: Yup.string().required('Required') }),
    email: Yup.string().email().required('Required'),
    password: Yup.string().required('Required'),
  });

const LoginForm = forwardRef<FormikProps<LoginFormValues>, LoginFormProps>(({ error, onSubmit, isSignInForm, onFormTypeChange }, ref): JSX.Element => {
  return (
    <Formik initialValues={{ name: '', email: '', password: '' }} innerRef={ref} validationSchema={formValidationSchema(isSignInForm)} onSubmit={onSubmit}>
      {() => (
        <Form>
          {!isSignInForm && <TextInputField id="name" label={TEXT.FullNameFieldLabel} name="name" placeholder={TEXT.FullNameFieldPlaceHolder} />}
          <TextInputField id="email" label={TEXT.EmailFieldLabel} name="email" placeholder={TEXT.EmailFieldPlaceHolder} />
          <TextInputField id="password" label={TEXT.PasswordFieldLabel} name="password" placeholder={TEXT.PasswordFieldPlaceHolder} type="password" />
          <p className={styles.formChangeText}>
            {isSignInForm ? TEXT.NotAUserYet : TEXT.AlreadyAUser}
            <Button className={styles.formChangeButton} secondary onClick={onFormTypeChange}>
              {isSignInForm ? TEXT.SignUp : TEXT.SignIn}
            </Button>
          </p>
          {error && <p className={styles.error}>{error}</p>}
          <Button className={styles.formSubmitButton} type="submit">
            {isSignInForm ? TEXT.SignIn : TEXT.SignUp}
          </Button>
        </Form>
      )}
    </Formik>
  );
});

LoginForm.displayName = 'LoginForm';

export default LoginForm;
