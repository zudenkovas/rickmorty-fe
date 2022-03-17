import { PropsWithChildren } from 'react';
import { combineClassNames } from 'utils/theme/styleUtils';

import styles from './Typography.module.css';

type TypographyElementProps = PropsWithChildren<{
  className?: string;
}>;

export const Heading1 = ({ className = '', children }: TypographyElementProps) => (
  <h1 className={combineClassNames([className, styles.heading1])}>{children}</h1>
);

export const Heading2 = ({ className = '', children }: TypographyElementProps) => (
  <h2 className={combineClassNames([className, styles.heading2])}>{children}</h2>
);
