import React from "react";
import { NavLink } from "react-router-dom";
import routes from "../../routes";
import styles from "./Navigation.module.css";

const Navigation = () => (
  <ul className={styles.nav}>
    <li className={styles.navItem}>
      <NavLink
        exact
        to={routes[0].path}
        className={styles.navItemLink}
        activeClassName={styles.navItemLinkActiv}
      >
        Home
      </NavLink>
    </li>
    <li className={styles.navItem}>
      <NavLink
        to={routes[1].path}
        className={styles.navItemLink}
        activeClassName={styles.navItemLinkActiv}
      >
        Movies
      </NavLink>
    </li>
  </ul>
);

export default Navigation;
