import { PropsWithChildren } from 'react';
import { combineClassNames } from 'utils/theme/styleUtils';

import styles from './DescriptionList.module.css';

type DescriptionListProps = PropsWithChildren<{ className?: string }>;
type DescriptionListItemProps = { className?: string; title?: string; details?: string | number };

export const DescriptionList = ({ children, className = '' }: DescriptionListProps) => (
  <dl className={combineClassNames([className, styles.descriptionList])}>{children}</dl>
);

export const DescriptionListItem = ({ className = '', details, title }: DescriptionListItemProps) => (
  <span className={combineClassNames([className, styles.descriptionListItemWrapper])}>
    <dt className={styles.descriptionTitle}>{title}</dt>
    <dd className={styles.descriptionDetails}>{details}</dd>
  </span>
);
