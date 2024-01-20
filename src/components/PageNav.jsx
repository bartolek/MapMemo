import { NavLink } from "react-router-dom";
import Logo from "./Logo";
import styles from "./PageNav.module.css";

function PageNav() {
  return (
    <nav className={styles.nav}>
      <Logo />
      <ul>
        <li>
          <NavLink to="/about">About</NavLink>
        </li>
        <li>
          <NavLink to="/flagsgame">FLAGS GAME</NavLink>
        </li>
        <li>
          <NavLink to="/app" className={styles.ctaLink}>
            START APP
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default PageNav;
