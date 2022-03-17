import { Field } from 'formik';

import { TextInputFieldStatelessProps } from './TextInputFieldStateless';
import TextInputFieldAdapter from './TextInputFieldAdapter';

const TextInputField = (props: TextInputFieldStatelessProps): JSX.Element => <Field {...props} component={TextInputFieldAdapter} />;

export default TextInputField;
