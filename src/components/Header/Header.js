import React from "react";
import Navigation from "../Navigation/Navigation";
import styles from "./Header.module.css";

const Header = () => (
  <header className={styles.header}>
    <Navigation />
  </header>
);

export default Header;
