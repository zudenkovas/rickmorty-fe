import { ReactNode } from 'react';
import { combineClassNames } from 'utils/theme/styleUtils';

import styles from './Layout.module.css';

type LayoutProps = {
  children: ReactNode;
  header: ReactNode;
  footer: ReactNode;
};

const Layout = ({ children, header, footer }: LayoutProps): JSX.Element => (
  <div className={styles.contentWrapper}>
    <div className={combineClassNames([styles.contentMargin, styles.stickyContainer])}>{header}</div>
    <main className={combineClassNames([styles.main, styles.contentMargin])}>{children}</main>
    <div className={styles.contentMargin}>{footer}</div>
  </div>
);

export default Layout;
