import { FieldProps } from 'formik';

import TextInputFieldStateless, { TextInputFieldStatelessProps } from './TextInputFieldStateless';

const TextInputFieldAdapter = (props: TextInputFieldStatelessProps & FieldProps): JSX.Element => {
  const { field, form, value, ...rest } = props;
  const touched = form.touched?.[field.name] as boolean;
  const fieldError = form.errors?.[field.name] as string;

  const error = touched && fieldError ? fieldError : undefined;

  return <TextInputFieldStateless error={error} value={field.value} onBlur={field.onBlur} onChange={field.onChange} {...rest} />;
};
export default TextInputFieldAdapter;
