import { PropsWithChildren } from 'react';
import { NavLink as NavigationLink } from 'react-router-dom';
import { combineClassNames } from 'utils/theme/styleUtils';

import styles from './NavLink.module.css';

type HeaderNavigationProps = PropsWithChildren<{ className?: string; to: string }>;

const NavLink = ({ className = '', children, to }: HeaderNavigationProps) => {
  return (
    <NavigationLink className={({ isActive }) => (isActive ? combineClassNames([className, styles.navLink, styles.isActive]) : styles.navLink)} to={to}>
      {children}
    </NavigationLink>
  );
};

export default NavLink;
