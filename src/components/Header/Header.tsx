import { NavLink } from 'react-router-dom';
import { Logo } from 'components/Icons';
import { RouteKey } from 'navigation';

import { HeaderNavigation } from './HeaderNavigation';
import styles from './Header.module.css';

const Header = (): JSX.Element => {
  return (
    <header className={styles.header}>
      <NavLink to={RouteKey.Index}>
        <Logo />
      </NavLink>
      <HeaderNavigation />
    </header>
  );
};

export default Header;
